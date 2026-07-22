/**
 * Ajudas de navegação e leitura.
 *
 * Tudo aqui é idempotente: o Quartz roda em modo SPA e dispara "nav"
 * a cada troca de página, então cada função precisa poder rodar de novo
 * sobre o DOM já montado sem duplicar nada.
 */

const TABLET_AND_BELOW = "(max-width: 1199px)"
const PHONE = "(max-width: 800px)"

/* -------------------------------------------------------------------------
   Barra de progresso de leitura
   ------------------------------------------------------------------------- */

function setupReadingProgress() {
  let bar = document.getElementById("reading-progress")
  if (!bar) {
    bar = document.createElement("div")
    bar.id = "reading-progress"
    bar.setAttribute("aria-hidden", "true")
    document.body.appendChild(bar)
  }

  const progressBar = bar
  let ticking = false

  const update = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0
    progressBar.style.width = `${Math.min(Math.max(ratio, 0), 1) * 100}%`
    ticking = false
  }

  const onScroll = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(update)
  }

  update()
  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("resize", onScroll, { passive: true })
  window.addCleanup(() => {
    window.removeEventListener("scroll", onScroll)
    window.removeEventListener("resize", onScroll)
  })
}

/* -------------------------------------------------------------------------
   Botão "voltar ao topo"
   ------------------------------------------------------------------------- */

function setupBackToTop() {
  let button = document.getElementById("to-top") as HTMLButtonElement | null
  if (!button) {
    button = document.createElement("button")
    button.id = "to-top"
    button.type = "button"
    button.setAttribute("aria-label", "Voltar ao topo")
    button.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>'
    button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    })
    document.body.appendChild(button)
  }

  const toTop = button
  const toggle = () => toTop.classList.toggle("visible", window.scrollY > 420)

  toggle()
  window.addEventListener("scroll", toggle, { passive: true })
  window.addCleanup(() => window.removeEventListener("scroll", toggle))
}

/* -------------------------------------------------------------------------
   Anterior / próximo capítulo

   A ordem de leitura sai da própria árvore do explorador, que já vem
   ordenada e marca o capítulo atual com .active. O explorador é montado
   por JS, então pode ainda não existir quando esta função roda: por isso
   a tentativa é repetida por alguns quadros.
   ------------------------------------------------------------------------- */

/** Nome do volume ao qual um link do explorador pertence. */
function volumeOf(link: HTMLAnchorElement): string | null {
  const outer = link.closest(".folder-outer")
  const container = outer?.previousElementSibling
  return container?.querySelector(".folder-title")?.textContent?.trim() ?? null
}

/** Onde o capítulo atual está dentro do volume: "capítulo 12 de 43". */
function buildChapterContext(active: HTMLAnchorElement) {
  const meta = document.querySelector(".content-meta")
  if (!meta) return

  meta.querySelectorAll(".meta-chip--nav").forEach((chip) => chip.remove())

  const volume = volumeOf(active)
  const siblings = Array.from(
    active.closest("ul")?.querySelectorAll<HTMLAnchorElement>(":scope > li > a") ?? [],
  )
  const position = siblings.indexOf(active)

  const chip = (text: string, kind: string) => {
    const span = document.createElement("span")
    span.className = `meta-chip--nav meta-chip--${kind}`
    span.textContent = text
    meta.appendChild(span)
  }

  if (volume) chip(volume, "volume")
  if (position >= 0 && siblings.length > 1) {
    chip(`${position + 1} de ${siblings.length}`, "position")
  }
}

function buildChapterNav(): boolean {
  const footer = document.querySelector(".page-footer")
  if (!footer) return true

  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>(".explorer-content a[href]"),
  ).filter((link) => link.textContent?.trim())

  if (links.length === 0) return false

  footer.querySelector(".chapter-nav")?.remove()

  const current = links.findIndex((link) => link.classList.contains("active"))
  if (current === -1) return true

  buildChapterContext(links[current])

  const previous = links[current - 1]
  const next = links[current + 1]
  if (!previous && !next) return true

  const nav = document.createElement("nav")
  nav.className = "chapter-nav"
  nav.setAttribute("aria-label", "Navegação entre capítulos")

  const card = (link: HTMLAnchorElement, kind: "prev" | "next") => {
    const anchor = document.createElement("a")
    anchor.className = `chapter-nav__link ${kind === "next" ? "is-next" : "is-prev"}`
    anchor.href = link.getAttribute("href")!

    const label = document.createElement("span")
    label.className = "chapter-nav__label"
    label.textContent = kind === "next" ? "Próximo →" : "← Anterior"

    const title = document.createElement("span")
    title.className = "chapter-nav__title"
    title.textContent = link.textContent!.trim()

    anchor.append(label, title)

    const volume = volumeOf(link)
    if (volume) {
      const context = document.createElement("span")
      context.className = "chapter-nav__volume"
      context.textContent = volume
      anchor.appendChild(context)
    }

    return anchor
  }

  if (previous) nav.appendChild(card(previous, "prev"))
  if (next) nav.appendChild(card(next, "next"))

  footer.prepend(nav)
  return true
}

function setupChapterNav() {
  let attempts = 0
  const attempt = () => {
    if (buildChapterNav()) return
    if (attempts++ < 90) requestAnimationFrame(attempt)
  }
  attempt()
}

/* -------------------------------------------------------------------------
   Sumário: vira um card retrátil acima do texto em telas menores
   ------------------------------------------------------------------------- */

function setupResponsiveToc() {
  const toc = document.querySelector<HTMLElement>(".toc")
  if (!toc) return

  const header = document.querySelector<HTMLElement>(".page-header")
  const rightSidebar = document.querySelector<HTMLElement>(".sidebar.right")
  if (!header || !rightSidebar) return

  const query = window.matchMedia(TABLET_AND_BELOW)

  const place = () => {
    if (query.matches) {
      if (toc.parentElement === header) return
      header.appendChild(toc)
      toc.classList.add("toc--inline")
      // fechado por padrão, para não empurrar o texto para baixo
      toc.querySelector(".toc-header")?.classList.add("collapsed")
      toc.querySelector(".toc-content")?.classList.add("collapsed")
    } else {
      if (toc.parentElement === rightSidebar) return
      rightSidebar.prepend(toc)
      toc.classList.remove("toc--inline")
      toc.querySelector(".toc-header")?.classList.remove("collapsed")
      toc.querySelector(".toc-content")?.classList.remove("collapsed")
    }
  }

  place()
  query.addEventListener("change", place)
  window.addCleanup(() => query.removeEventListener("change", place))
}

/* -------------------------------------------------------------------------
   Fecha a gaveta do explorador ao tocar no véu escuro (celular)
   ------------------------------------------------------------------------- */

function setupDrawerDismiss() {
  const explorer = document.querySelector<HTMLElement>(".explorer")
  const toggle = document.querySelector<HTMLElement>("button.mobile-explorer")
  if (!explorer || !toggle) return

  const onClick = (event: MouseEvent) => {
    if (explorer.classList.contains("collapsed")) return
    if (!window.matchMedia(PHONE).matches) return
    if (explorer.contains(event.target as Node)) return
    toggle.click()
  }

  document.addEventListener("click", onClick)
  window.addCleanup(() => document.removeEventListener("click", onClick))
}

/* -------------------------------------------------------------------------
   Aparecer ao rolar, só nos blocos grandes
   ------------------------------------------------------------------------- */

function setupReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

  const targets = document.querySelectorAll(
    "article > h2, article > .callout, article > blockquote, article > pre, article > table, .volume-card, .home-stats",
  )
  if (targets.length === 0) return

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add("revealed")
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.05, rootMargin: "0px 0px -40px 0px" },
  )

  targets.forEach((target) => {
    target.classList.add("reveal-element")
    observer.observe(target)
  })

  window.addCleanup(() => observer.disconnect())
}

document.addEventListener("nav", () => {
  setupReadingProgress()
  setupBackToTop()
  setupChapterNav()
  setupResponsiveToc()
  setupDrawerDismiss()
  setupReveal()
})
