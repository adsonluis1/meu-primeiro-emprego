import { Link } from "react-router"
import { copyright, footerColumns, footerLinks } from "../../data/site.ts"

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-outline-variant bg-surface-container-lowest py-space-xl text-on-surface-variant">
      <div className="mx-auto flex max-w-[1040px] flex-col gap-space-lg px-margin">
        <div className="grid grid-cols-1 gap-space-lg md:grid-cols-2">
          {footerColumns.map((column) => (
            <div key={column.title} className="flex flex-col gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-on-surface">
                {column.title}
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {column.body}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-between gap-space-md border-t border-outline-variant pt-space-md sm:flex-row">
          <span className="font-caption text-caption text-on-surface-variant">
            {copyright}
          </span>
          <nav className="flex items-center gap-space-md" aria-label="Informações">
            {footerLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="pressable font-label-sm text-label-sm text-on-surface-variant transition-colors hover:text-on-surface"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
