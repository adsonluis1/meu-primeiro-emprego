import type { Video } from "../../data/videos.ts"
import { VideoCard } from "./VideoCard.tsx"

type VideoGridProps = {
  videos: readonly Video[]
}

export function VideoGrid({ videos }: VideoGridProps) {
  return (
    <div className="grid min-w-0 grid-cols-1 gap-space-lg md:grid-cols-2">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}
