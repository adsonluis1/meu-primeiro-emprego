import { useState } from "react"
import type { VideoFilter } from "../../data/videos.ts"
import { videos, videosIntro } from "../../data/videos.ts"
import { VideoFilters } from "./VideoFilters.tsx"
import { VideoGrid } from "./VideoGrid.tsx"
import { VideosEmpty } from "./VideosEmpty.tsx"
import { VideosHelp } from "./VideosHelp.tsx"

function videosForFilter(active: VideoFilter) {
  if (active === "Todos os conteúdos") {
    return videos
  }
  return videos.filter((video) => video.filter === active)
}

export function VideosPage() {
  const [active, setActive] = useState<VideoFilter>("Todos os conteúdos")
  const visible = videosForFilter(active)

  return (
    <section className="mx-auto w-full max-w-[1040px] min-w-0 px-margin py-space-xl">
      <div className="mb-space-xl flex max-w-full flex-col gap-space-xs">
        <div className="mb-space-xs flex w-full min-w-0 items-start gap-space-xs">
          <span
            className="mt-[0.35rem] h-2 w-2 shrink-0 rounded-full bg-primary"
            aria-hidden="true"
          />
          <span className="min-w-0 font-label-sm text-label-sm tracking-wider text-primary uppercase">
            {videosIntro.eyebrow}
          </span>
        </div>
        <h1 className="max-w-[800px] text-balance font-display-hero text-display-hero-mobile text-on-surface md:text-display-hero">
          {videosIntro.title}
        </h1>
        <p className="mt-space-xs max-w-[720px] font-body-lg text-body-lg text-on-surface-variant">
          {videosIntro.body}
        </p>
      </div>
      <VideoFilters active={active} onSelect={setActive} />
      {visible.length === 0 ? <VideosEmpty /> : <VideoGrid videos={visible} />}
      <VideosHelp />
    </section>
  )
}
