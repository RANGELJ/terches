import useFirebaseAuthUser from './useFirebaseAuthUser'
import useFirebaseRtDbValue from './useFirebaseRtDbValue'

const useUserHasProfileUrl = () => {
  const user = useFirebaseAuthUser()!

  const hasProfileUrl = useFirebaseRtDbValue<boolean>(
    `user/${user.uid}/hasProfileUrl`
  )

  return !!hasProfileUrl
}

export default useUserHasProfileUrl
