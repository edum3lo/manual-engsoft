import { JSX } from "preact"
import { FullSlug, pathToRoot, resolveRelative } from "../util/path"
import { classNames } from "../util/lang"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

type IconName = "home" | "book" | "compass" | "github" | "linkedin"

interface NavItem {
  label: string
  /** slug interno (ex: "Volume-1-Fundamentos/00-Indice"), URL absoluta, ou "" para a home */
  href: string
  icon: IconName
}

interface Options {
  links: NavItem[]
}

const defaultOptions: Options = {
  links: [
    { label: "Início", href: "", icon: "home" },
    { label: "Índice geral", href: "Volume-1-Fundamentos/00-Indice", icon: "compass" },
  ],
}

const icons: Record<IconName, JSX.Element> = {
  home: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V20a1 1 0 0 0 1 1H10v-6h4v6h3.5a1 1 0 0 0 1-1V9.5" />
    </>
  ),
  book: (
    <>
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22z" />
      <path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2.1 5-5 2.1 2.1-5z" />
    </>
  ),
  github: (
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-11h4v1.5A6 6 0 0 1 16 8z" />
      <rect x="2" y="9" width="4" height="12" rx="1" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
}

export default ((userOpts?: Partial<Options>) => {
  const opts: Options = { ...defaultOptions, ...userOpts }

  const NavLinks: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const slug = fileData.slug!
    return (
      <nav class={classNames(displayClass, "nav-links")} aria-label="Navegação principal">
        {opts.links.map(({ label, href, icon }) => {
          const external = href.startsWith("http")
          let url = href
          if (!external) {
            url = href === "" ? pathToRoot(slug) : resolveRelative(slug, href as FullSlug)
          }
          return (
            <a
              class="nav-link"
              href={url}
              aria-label={label}
              data-tooltip={label}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                {icons[icon]}
              </svg>
              <span class="nav-link__label">{label}</span>
            </a>
          )
        })}
      </nav>
    )
  }

  return NavLinks
}) satisfies QuartzComponentConstructor
