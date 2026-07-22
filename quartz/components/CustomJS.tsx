// @ts-ignore
import script from "./scripts/custom.inline"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const CustomJS: QuartzComponent = (props: QuartzComponentProps) => {
  return null
}

CustomJS.afterDOMLoaded = script

export default (() => CustomJS) satisfies QuartzComponentConstructor
