import useFirebaseAuthUser from './useFirebaseAuthUser'

const useAuthUserIsNotSignedIn = () => !useFirebaseAuthUser()

export default useAuthUserIsNotSignedIn
