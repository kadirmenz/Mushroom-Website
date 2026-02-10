"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Media =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string };

export default function MediaRenderer({ media }: { media: Media }) {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  // media değişince state reset (kritik)
  useEffect(() => {
    setReady(false);
    setError(false);
  }, [media.type, media.src]);

  if (media.type === "image") {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-100">
        <Image
          src={media.src}
          alt={media.alt}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 33vw, 100vw"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black">
      <video
        key={media.src} // kaynak değişince video elementini yenile (kritik)
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={media.poster}
        onLoadedMetadata={() => setReady(true)}
        onLoadedData={() => setReady(true)}
        onCanPlay={() => setReady(true)}
        onPlaying={() => setReady(true)}
        onError={() => setError(true)}
      >
        <source src={media.src} type="video/mp4" />
      </video>

      {/* Loading overlay */}
      <div
        className={[
          "pointer-events-none absolute inset-0 flex items-center justify-center text-xs text-white/70 transition-opacity duration-300",
          ready || error ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        Video yükleniyor…
      </div>

      {/* Error overlay */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
          <p className="text-xs text-white/80">Video açılamadı.</p>
          <a className="text-xs text-white/70 underline" href={media.src} target="_blank" rel="noreferrer">
            Videoyu yeni sekmede aç
          </a>
        </div>
      )}
    </div>
  );
}
