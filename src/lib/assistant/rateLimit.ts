import Redis from 'ioredis';
import { RateLimiterMemory, RateLimiterRedis } from 'rate-limiter-flexible';

const POINTS = 10;
const DURATION = 600;

let redisLimiter: RateLimiterRedis | null = null;
let cvRedisLimiter: RateLimiterRedis | null = null;
let warnedMissingRedisUrl = false;

const memoryLimiter = new RateLimiterMemory({
  points: POINTS,
  duration: DURATION,
});

const cvMemoryLimiter = new RateLimiterMemory({
  points: POINTS,
  duration: DURATION,
});

function getRedisLimiter(): RateLimiterRedis | null {
  if (redisLimiter) return redisLimiter;

  const url = process.env.REDIS_URL;
  if (!url) {
    if (process.env.NODE_ENV === 'production' && !warnedMissingRedisUrl) {
      warnedMissingRedisUrl = true;
      console.warn('Assistant rate limit degraded: missing REDIS_URL');
    }
    return null;
  }

  const client = new Redis(url, {
    lazyConnect: true,
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
  });
  client.on('error', () => {});

  redisLimiter = new RateLimiterRedis({
    storeClient: client,
    points: POINTS,
    duration: DURATION,
    keyPrefix: 'assistant',
  });

  return redisLimiter;
}

function getCvRedisLimiter(): RateLimiterRedis | null {
  if (cvRedisLimiter) return cvRedisLimiter;

  const url = process.env.REDIS_URL;
  if (!url) return null;

  const client = new Redis(url, {
    lazyConnect: true,
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
  });
  client.on('error', () => {});

  cvRedisLimiter = new RateLimiterRedis({
    storeClient: client,
    points: POINTS,
    duration: DURATION,
    keyPrefix: 'cv-tailor',
  });

  return cvRedisLimiter;
}

export async function allowAssistantRequest(ip: string): Promise<boolean> {
  const limiter = getRedisLimiter();
  if (limiter) {
    try {
      await limiter.consume(ip, 1);
      return true;
    } catch (error) {
      if (error && typeof error === 'object' && 'msBeforeNext' in error) {
        return false;
      }
    }
  }

  try {
    await memoryLimiter.consume(ip, 1);
    return true;
  } catch {
    return false;
  }
}

export async function allowCvTailorRequest(ip: string): Promise<boolean> {
  const limiter = getCvRedisLimiter();
  if (limiter) {
    try {
      await limiter.consume(ip, 1);
      return true;
    } catch (error) {
      if (error && typeof error === 'object' && 'msBeforeNext' in error) {
        return false;
      }
    }
  }

  try {
    await cvMemoryLimiter.consume(ip, 1);
    return true;
  } catch {
    return false;
  }
}
