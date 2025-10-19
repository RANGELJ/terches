import FirebaseAuthUserContext from '@src/context/FirebaseAuthUserContext'
import { useContext } from 'react'

const useFirebaseAuthUser = () => useContext(FirebaseAuthUserContext)

export default useFirebaseAuthUser
