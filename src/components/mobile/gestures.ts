/**
 * Gesture-completion thresholds for framer-motion drags.
 * `offset` is total pixels dragged from the start; `velocity` is px/s at release.
 * Downward = positive Y; upward = negative Y.
 */
const GESTURE_DISTANCE_THRESHOLD_PX = 110;
const GESTURE_FLICK_THRESHOLD_PX_PER_SECOND = 550;

/** A drag/flick downward far/fast enough to dismiss a sheet. */
export function shouldDismissDownward(offsetY: number, velocityY: number): boolean {
  return offsetY > GESTURE_DISTANCE_THRESHOLD_PX || velocityY > GESTURE_FLICK_THRESHOLD_PX_PER_SECOND;
}

/** A drag/flick upward far/fast enough to unlock (enter the site). */
export function shouldUnlockUpward(offsetY: number, velocityY: number): boolean {
  return offsetY < -GESTURE_DISTANCE_THRESHOLD_PX || velocityY < -GESTURE_FLICK_THRESHOLD_PX_PER_SECOND;
}
