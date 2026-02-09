"use client";

import { useState } from "react";

type Caption = { id: string; content: string };
type ImageRow = {
  id: string;
  url: string;
  captions?: Caption[];
};

export default function ImageCard({ image }: { image: ImageRow }) {
  const [status, setStatus] = useState<"idle" | "loaded" | "error">("idle");

  const caption = image.captions?.[0]?.content ?? "";

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl">
      {/* Image */}
      <div className="relative bg-slate-100">
        <div className="aspect-[4/5] w-full overflow-hidden">
          <img
            src={image.url}
            alt={caption || "Gallery image"}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            loading="lazy"
            decoding="async"
            onLoad={() => setStatus("loaded")}
            onError={() => setStatus("error")}
          />
        </div>

        {/* Loading / Error badges */}
        {status !== "loaded" && (
          <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-700 shadow-sm backdrop-blur">
            {status === "idle" ? "Loading…" : "Image failed"}
          </div>
        )}

        {/* Soft bottom fade for caption readability */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Caption */}
      <div className="p-5">
        <p className="text-[15px] font-medium leading-snug text-slate-900">
          {caption || <span className="text-slate-400 italic">No caption yet.</span>}
        </p>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <span className="font-semibold uppercase tracking-wide">Community</span>
          <span className="rounded-full bg-slate-100 px-2 py-1 font-mono">
            {image.id.slice(0, 8)}
          </span>
        </div>
      </div>
    </article>
  );
}
