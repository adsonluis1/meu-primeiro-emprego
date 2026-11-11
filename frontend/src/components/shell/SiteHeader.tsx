import { useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router"
import { navItems, brand } from "../../data/site.ts"
import { Icon } from "../icon/Icon.tsx"

function linkClass(isActive: boolean) {
  return isActive
    ? "inline-flex items-center border-b-2 border-primary-container font-label-md text-label-md font-semibold text-primary-container"
    : "inline-flex items-center font-label-md text-label-md text-on-surface-variant transition-colors hover:text-on-surface"
}

function DesktopNav() {
  return (
    <nav className="hidden h-16 items-center gap-space-lg md:flex" aria-label="Seções">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) => `pressable h-full ${linkClass(isActive)}`}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

function MobileNav({
  open,
  onNavigate,
}: {
  open: boolean
  onNavigate: () => void
}) {
  return (
    <nav
      id="site-menu"
      aria-label="Seções"
      hidden={!open}
      className="absolute inset-x-0 top-full border-b border-outline-variant bg-surface-container-lowest px-margin py-space-sm md:hidden"
    >
      <ul className="flex flex-col">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              onClick={onNavigate}
              className={({ isActive }) =>
                `pressable w-full py-space-sm ${linkClass(isActive)} border-b-0`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function SiteHeader() {
  const { pathname } = useLocation()
  return <HeaderBar key={pathname} />
}

function HeaderBar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) {
      return
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header className="site-chrome fixed top-0 z-50 w-full border-b border-outline-variant">
      <div className="mx-auto flex h-16 max-w-[1040px] items-center justify-between gap-space-md px-margin">
        <NavLink to="/" end className="pressable flex flex-col text-left">
          <span className="font-headline-sm text-headline-sm text-primary">
            {brand.name}
          </span>
          <span className="font-caption text-caption tracking-normal text-on-surface-variant">
            {brand.tagline}
          </span>
        </NavLink>
        <div className="flex items-center gap-space-sm md:gap-space-lg">
          <DesktopNav />
          <button
            type="button"
            className="pressable inline-flex h-10 w-10 items-center justify-center rounded-lg text-on-surface md:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((current) => !current)}
          >
            <Icon name={open ? "close" : "menu"} />
            <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
          </button>
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary"
            aria-hidden="true"
          >
            <Icon name="person" className="text-[18px] text-on-primary" />
          </div>
        </div>
      </div>
      <MobileNav open={open} onNavigate={() => setOpen(false)} />
    </header>
  )
}
