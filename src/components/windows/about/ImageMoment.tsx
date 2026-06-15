import Image from 'next/image';

export function ImageMoment({ src, caption }: { src: string; caption?: string }) {
  return (
    <figure className="my-1 space-y-1.5">
      <div className="relative h-48 w-full overflow-hidden rounded-xl md:h-64">
        <Image src={src} alt={caption ?? ''} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
      </div>
      {caption && (
        <figcaption className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
