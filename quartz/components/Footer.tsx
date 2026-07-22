import { JSX } from "preact"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"

type IconName = "portfolio" | "linkedin" | "instagram" | "github"

interface FooterLink {
  label: string
  href: string
  icon: IconName
}

interface Options {
  author: string
  authorUrl?: string
  tagline?: string
  links: FooterLink[]
}

const defaultOptions: Options = {
  author: "Eduardo Melo",
  links: [],
}

const icons: Record<IconName, JSX.Element> = {
  portfolio: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
    </>
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-11h4v1.5A6 6 0 0 1 16 8z" />
      <rect x="2" y="9" width="4" height="12" rx="1" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  github: (
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  ),
}

export default ((userOpts?: Partial<Options>) => {
  const opts: Options = { ...defaultOptions, ...userOpts }

  const Footer: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const year = new Date().getFullYear()

    return (
      <footer class={`${displayClass ?? ""}`}>
        <div class="footer-credit">
          <span class="footer-credit__label">Dev by</span>
          {opts.authorUrl ? (
            <a
              class="footer-credit__name"
              href={opts.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {opts.author}
            </a>
          ) : (
            <span class="footer-credit__name">{opts.author}</span>
          )}
        </div>

        {opts.tagline ? <p class="footer-tagline">{opts.tagline}</p> : null}

        <ul>
          {opts.links.map(({ label, href, icon }) => (
            <li>
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
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
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>

        <p class="footer-legal">© {year} {opts.author}</p>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
