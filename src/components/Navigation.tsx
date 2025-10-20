import { createStaticNavigation } from '@react-navigation/native'
import RootStack from '@src/navigators/MainRootStack'

const Navigation = createStaticNavigation(RootStack)

export default Navigation
