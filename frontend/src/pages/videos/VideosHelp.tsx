import { Link } from "react-router"
import { Icon } from "../../components/icon/Icon.tsx"
import { videosIntro } from "../../data/videos.ts"

export function VideosHelp() {
  return (
    <div className="mt-space-xl flex w-full min-w-0 flex-col gap-space-md rounded-xl bg-surface-container p-space-lg md:flex-row md:items-center md:justify-between">
      <div className="flex min-w-0 flex-1 items-start gap-space-md">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-container text-on-primary-container">
          <Icon name="school" className="text-[20px]" />
        </span>
        <div className="flex min-w-0 flex-col">
          <span className="text-balance font-headline-sm text-headline-sm text-on-surface">
            {videosIntro.helpTitle}
          </span>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {videosIntro.helpBody}
          </p>
        </div>
      </div>
      <Link
        to={videosIntro.helpTo}
        className="pressable w-fit shrink-0 rounded bg-surface-container-lowest px-space-md py-space-xs font-label-md text-label-md font-semibold text-primary shadow-sm transition-colors hover:bg-surface-bright"
      >
        {videosIntro.helpAction}
      </Link>
    </div>
  )
}
