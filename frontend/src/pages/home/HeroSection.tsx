import { Link } from "react-router"
import { Icon } from "../../components/icon/Icon.tsx"
import { hero, heroImage } from "../../data/home.ts"

function AssuranceRow() {
  return (
    <div className="flex flex-wrap items-center gap-x-space-md gap-y-space-xs pt-space-sm font-caption text-caption text-on-surface-variant">
      {hero.assurances.map((item, index) => (
        <span
          key={item}
          className="inline-flex max-w-full items-center gap-1"
        >
          {index > 0 ? (
            <span aria-hidden="true" className="shrink-0">
              •
            </span>
          ) : (
            <Icon
              name="verified"
              className="shrink-0 text-[16px] text-primary"
            />
          )}
          <span className="min-w-0 break-words">{item}</span>
        </span>
      ))}
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="defer-section w-full min-w-0 bg-surface-container-lowest py-space-xl">
      <div className="mx-auto min-w-0 max-w-[1040px] px-margin">
        <div className="grid min-w-0 grid-cols-1 items-center gap-space-xl lg:grid-cols-12">
          <div className="flex min-w-0 flex-col gap-space-md lg:col-span-7">
            <div className="inline-flex max-w-full flex-wrap items-center gap-space-xs font-label-sm text-label-sm text-primary">
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-primary"
                aria-hidden="true"
              />
              {hero.eyebrow}
            </div>
            <h1 className="max-w-full font-display-hero text-display-hero-mobile break-words text-balance tracking-tight text-on-surface md:text-display-hero">
              {hero.title}
            </h1>
            <p className="max-w-[620px] font-body-lg text-body-lg text-pretty text-on-surface-variant">
              {hero.body}
            </p>
            <div className="flex flex-col items-stretch gap-space-sm pt-space-xs sm:flex-row sm:items-center">
              <a
                href={hero.primary.href}
                className="pressable inline-flex w-full items-center justify-center gap-space-xs rounded-lg bg-primary-container px-space-md py-3 font-label-md text-label-md text-on-primary shadow-sm hover:opacity-95 sm:w-auto"
              >
                <span>{hero.primary.label}</span>
                <Icon name={hero.primary.icon} className="text-[18px]" />
              </a>
              <Link
                to={hero.secondary.to}
                className="pressable inline-flex w-full items-center justify-center gap-space-xs rounded-lg bg-surface-container-low px-space-md py-3 font-label-md text-label-md text-on-surface hover:bg-surface-container sm:w-auto"
              >
                <span>{hero.secondary.label}</span>
                <Icon name={hero.secondary.icon} className="text-[18px]" />
              </Link>
            </div>
            <AssuranceRow />
          </div>
          <div className="flex min-w-0 flex-col gap-space-md lg:col-span-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-surface-container shadow-sm">
              <div className="absolute inset-0">
                <img
                  src={heroImage.src}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-on-background/80 to-transparent p-space-md text-on-primary">
                <p className="font-label-sm text-label-sm font-semibold">
                  {heroImage.caption}
                </p>
                <p className="font-caption text-caption text-pretty text-surface-container-highest">
                  {heroImage.captionDetail}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
