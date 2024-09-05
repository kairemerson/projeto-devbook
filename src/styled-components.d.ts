import { theme } from "./styles/theme";

type Theme = typeof theme

declare module "style-components" {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    export interface DefaultTheme extends Theme {}
}