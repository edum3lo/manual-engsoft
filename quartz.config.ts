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
        header: "Outfit",
        body: "Inter",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#ffffff",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#2563eb", // Tailwind Blue 600
          tertiary: "#3b82f6", // Tailwind Blue 500
          highlight: "rgba(37, 99, 235, 0.1)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#09090b", // Deep black background (zinc-950)
          lightgray: "#27272a", // zinc-800 for borders
          gray: "#71717a", // zinc-500 for muted text
          darkgray: "#d4d4d4", // Main body text
          dark: "#f4f4f5", // Bright headers
          secondary: "#3b82f6", // Vibrant blue
          tertiary: "#60a5fa", // Lighter blue
          highlight: "rgba(59, 130, 246, 0.15)", // Translucent blue highlight
          textHighlight: "rgba(59, 130, 246, 0.4)",
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
