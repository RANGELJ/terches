import Svg, { Path } from 'react-native-svg'

type Props = {
  size: number
  fill: string
}

const ArrowRightAlt = ({ size, fill }: Props) => (
  <Svg height={size} viewBox="0 -960 960 960" width={size} fill={fill}>
    <Path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
  </Svg>
)

export default ArrowRightAlt
