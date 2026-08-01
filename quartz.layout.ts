import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

/**
 * Os arquivos já trazem `title:` no frontmatter (gerado a partir do H1 de cada
 * capítulo), então o nome deles na navegação vem pronto e acentuado.
 * As PASTAS não têm frontmatter, então continuam vindo do nome da pasta:
 * "Volume-3-Desenvolvimento-de-Software" precisa virar algo legível.
 *
 * Atenção: esta função é serializada com toString() e avaliada no navegador,
 * então ela não pode referenciar nada de fora do próprio corpo.
 */
const prettifyNames = (node: { isFolder: boolean; displayName: string }) => {
  if (!node.isFolder) {
    // rede de segurança para algum arquivo que fique sem frontmatter
    if (node.displayName.includes("-")) {
      node.displayName = node.displayName.replace(/^(\d+)-/, "$1 - ").replace(/-/g, " ")
    }
    return
  }

  // Volume-3-Desenvolvimento-de-Software → Volume 3 · Desenvolvimento de Software
  node.displayName = node.displayName.replace(/^Volume-(\d+)-/, "Volume $1 · ").replace(/-/g, " ")
}

const explorer = Component.Explorer({
  title: "Explorador",
  folderDefaultState: "collapsed",
  mapFn: prettifyNames,
})

const breadcrumbs = Component.Breadcrumbs({ rootName: "Início", spacerSymbol: "›" })

// na home o herói já dá o título; repetir o <h1> e a data ali só polui
const notHomePage = (props: { fileData: { slug?: string } }) => props.fileData.slug !== "index"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.PageTitle(),
    Component.Spacer(),
    Component.NavLinks({
      links: [
        { label: "Início", href: "", icon: "home" },
        { label: "Índice geral", href: "Volume-1-Fundamentos/00-Indice", icon: "compass" },
        { label: "Manual de bolso", href: "Volume-6-Manual-de-Bolso/00-Indice", icon: "book" },
        { label: "Manual do NES", href: "Volume-7-Manual-do-NES/00-Indice", icon: "book" },
        { label: "GitHub", href: "https://github.com/edum3lo", icon: "github" },
      ],
    }),
    Component.Search(),
    Component.Darkmode(),
  ],
  afterBody: [Component.CustomJS()],
  footer: Component.Footer({
    author: "Eduardo Melo",
    authorUrl: "https://portfolio-eduardo-melo.vercel.app",
    tagline: "Coleção autoral escrita, diagramada e publicada por mim.",
    links: [
      {
        label: "Portfólio",
        href: "https://portfolio-eduardo-melo.vercel.app",
        icon: "portfolio",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/oeduardomnunes/",
        icon: "linkedin",
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/_eduardo._melo/",
        icon: "instagram",
      },
      { label: "GitHub", href: "https://github.com/edum3lo", icon: "github" },
    ],
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    breadcrumbs,
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: notHomePage,
    }),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: notHomePage,
    }),
    Component.TagList(),
  ],
  left: [explorer],
  // o sumário também aparece no celular (vira um card retrátil, ver custom.scss)
  right: [
    Component.TableOfContents(),
    Component.Graph({
      localGraph: { depth: 1, scale: 1.15, linkDistance: 34, fontSize: 0.55 },
      globalGraph: { depth: -1, scale: 0.9, focusOnHover: true, enableRadial: true },
    }),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [breadcrumbs, Component.ArticleTitle(), Component.ContentMeta()],
  left: [explorer],
  right: [],
}
