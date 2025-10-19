import { NavigationProp, StaticParamList } from '@react-navigation/native'
import type NonAuthenticatedStack from '@src/stacks/NonAuthenticatedStack'
import type RootStack from '@src/stacks/rootStack'
import { useNavigation as useNavigationBase } from '@react-navigation/native'

type ParamLists = {
  Root: StaticParamList<typeof RootStack>
  NonAuthenticated: StaticParamList<typeof NonAuthenticatedStack>
}

const useNavigation = <Key extends keyof ParamLists>() =>
  useNavigationBase<NavigationProp<ParamLists[Key]>>()

export default useNavigation
