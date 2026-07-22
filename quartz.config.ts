import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Configuração do Quartz para a coleção
 * "Do Estudante ao Engenheiro de Software".
 *
 * → Substitua o quartz.config.ts padrão do seu Quartz por este arquivo.
 * → Edite o `baseUrl` abaixo com o endereço do seu site.
 *
 * ⚠️ Se o build reclamar (o Quartz muda de versão às vezes), use o caminho
 *    seguro: mantenha o config ORIGINAL do seu Quartz e altere só, no bloco
 *    `configuration`, o `pageTitle`, o `locale: "pt-BR"` e o `baseUrl`.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "DevNotes | Engenharia de Software",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true, // pré-visualização ao passar o mouse nos links
    analytics: null, // sem rastreamento (troque por Plausible/Umami se quiser)
    locale: "pt-BR",
    // 👇 EDITE AQUI com o endereço do seu site (sem https://):
    baseUrl: "edum3lo.github.io/manual-engsoft",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Outfit",
        body: "Inter",
        code: "JetBrains Mono",
      },
      // Paleta "Índigo + Âmbar".
      // Os tokens extras (superfícies, sombras, âmbar) ficam em
      // quartz/styles/custom.scss, no bloco :root do topo.
      colors: {
        lightMode: {
          light: "#faf9f6", // papel creme, não branco puro
          lightgray: "#e7e3da", // bordas e divisórias
          gray: "#8d8779", // texto secundário
          darkgray: "#39364a", // corpo de texto
          dark: "#16152b", // títulos
          secondary: "#5b4bd6", // índigo (links, pastas)
          tertiary: "#7c6cff", // índigo claro (hover)
          highlight: "rgba(91, 75, 214, 0.08)",
          textHighlight: "rgba(217, 119, 6, 0.25)", // marca-texto âmbar
        },
        darkMode: {
          light: "#0f1120", // azul-noite profundo
          lightgray: "#272b47",
          gray: "#8b8fb3",
          darkgray: "#c6cae6",
          dark: "#f3f4fc",
          secondary: "#8f80ff",
          tertiary: "#b3a7ff",
          highlight: "rgba(124, 108, 255, 0.14)",
          textHighlight: "rgba(255, 180, 84, 0.32)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "material-theme-palenight", // combina com o índigo do tema
        },
        keepBackground: false,
      }),
      // 👇 este plugin é o que faz os [[wiki-links]] da coleção funcionarem
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      // "shortest": resolve [[73-Autenticacao...]] achando o arquivo pelo nome
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
