import { Icon } from "../../components/icon/Icon.tsx"
import type { Video } from "../../data/videos.ts"

type VideoCardProps = {
  video: Video
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-surface-container-high">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
          title={video.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-space-md p-space-md">
        <div className="flex min-w-0 flex-col gap-space-xs">
          <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-space-sm gap-y-space-xs">
            <span className="rounded bg-surface-container px-2 py-0.5 font-caption text-caption font-semibold tracking-wide text-tertiary">
              {video.tag}
            </span>
            <span className="min-w-0 font-caption text-caption text-on-surface-variant">
              {video.source}
            </span>
          </div>
          <h2 className="text-balance font-headline-sm text-headline-sm leading-snug text-on-surface transition-colors group-hover:text-primary">
            {video.title}
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {video.description}
          </p>
        </div>
        <div className="pt-space-xs">
          <a
            href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`Assistir ${video.title} no YouTube em nova guia`}
            className="pressable inline-flex max-w-full items-center gap-1.5 font-label-md text-label-md font-semibold text-primary transition-colors hover:text-tertiary"
          >
            <span>Assistir no YouTube</span>
            <Icon name="open_in_new" className="text-[16px]" />
          </a>
        </div>
      </div>
    </article>
  )
}
