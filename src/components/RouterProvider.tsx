import RouterContext, { type RouterPath } from '@src/context/RouterContext'
import { lazy, useMemo, useState } from 'react'

const routes = [
  {
    path: '/',
    lazy: lazy(() => import('@src/screens/SplashScreen')),
  },
]

type StackEntry = {
  path: RouterPath
}

const defaultStackEntry: StackEntry = { path: '/' }

const RouterProvider = () => {
  const [stack, setStack] = useState<StackEntry[]>([])

  const currentEntry = stack.at(-1) || defaultStackEntry

  const currentPath = currentEntry.path

  const currentRoute = routes.find((route) => route.path === currentPath)

  if (!currentRoute) {
    throw new Error(`No route found for path: ${currentPath}`)
  }

  return (
    <RouterContext.Provider
      value={useMemo(
        () => ({
          navigate: (newPath, options) => {
            if (options?.replace) {
              setStack((prevStack) => {
                const newStack = [...prevStack]
                newStack[newStack.length - 1] = { path: newPath }
                return newStack
              })
            } else {
              throw new Error('Not implemented without replace option')
            }
          },
        }),
        []
      )}
    >
      <currentRoute.lazy />
    </RouterContext.Provider>
  )
}

export default RouterProvider
