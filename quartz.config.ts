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
    pageTitle: "Do Estudante ao Engenheiro de Software",
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
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#1f6feb", // azul dos links/destaques
          tertiary: "#84a59d",
          highlight: "rgba(31, 111, 235, 0.10)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#58a6ff",
          tertiary: "#84a59d",
          highlight: "rgba(88, 166, 255, 0.12)",
          textHighlight: "#b3aa0288",
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
          dark: "github-dark",
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
