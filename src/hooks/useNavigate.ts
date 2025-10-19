import RouterContext from '@src/context/RouterContext'
import { useContext } from 'react'

const useNavigate = () => {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error('useNavigate must be used within a RouterProvider')
  }
  return context.navigate
}

export default useNavigate
