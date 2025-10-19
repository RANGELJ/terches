import useFirebaseAuthUser from './useFirebaseAuthUser'

const useAuthUserIsSignedIn = () => !!useFirebaseAuthUser()

export default useAuthUserIsSignedIn
