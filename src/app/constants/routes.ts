export type Routes = 'home'

export type IRoute = {
  /** Translation key for the route title (document title) */
  titleKey: string
  /** URL for the route */
  url: () => string
}

export const routes: Record<Routes, IRoute> = {
  home: {
    titleKey: 'Home',
    url: () => '/',
  },
}
