import { createStaticNavigation } from '@react-navigation/native'
import RootStack from '@src/navigators/RootStack'

const Navigation = createStaticNavigation(RootStack)

export default Navigation
