type IconProps = {
  name: string
  className?: string
}

export function Icon({ name, className }: IconProps) {
  return (
    <span
      className={
        className
          ? `material-symbols-outlined ${className}`
          : "material-symbols-outlined"
      }
      aria-hidden="true"
    >
      {name}
    </span>
  )
}
