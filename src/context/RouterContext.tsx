import { createContext } from 'react'

export type RouterPath = `/${string}`

type NavigateOptions = {
  replace?: boolean
}

type RouterContextType = {
  navigate: (path: RouterPath, options?: NavigateOptions) => void
}

const RouterContext = createContext<RouterContextType | null>(null)

export default RouterContext
