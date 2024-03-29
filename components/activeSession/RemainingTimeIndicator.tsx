import { Dimensions } from "react-native"
import { Circle, Svg } from "react-native-svg"

type Props = { 
	totalSeconds: number,
	remainingSeconds: number 
}

const { width } =  Dimensions.get("window")
const size = width - 64 
const mainStrokeWidth = 5
const bgStrokeWidth = 2
const radius = (size - mainStrokeWidth) / 2
const circum = radius * 2 * Math.PI 

const RemainingTimeIndicator: React.FC<Props> = ({ totalSeconds, remainingSeconds }) => {
	const offset: number = (1 - (remainingSeconds / totalSeconds)) * circum;

	return (
		<Svg width={size} height={size}>
			<Circle 
				stroke={remainingSeconds > 10 ? '#505050' : '#5E2E28'}
				fill="none"
				cy={size / 2}
				cx={size / 2}
				r={radius}
				strokeWidth={bgStrokeWidth}
			/>
			<Circle 
				stroke={remainingSeconds > 10 ? '#F5F6F3' : '#F4533E'}
				fill="none"
				cy={size / 2}
				cx={size / 2}
				r={radius}
				strokeDasharray={`${circum} ${circum}`}
				strokeDashoffset={offset}
				strokeLinecap="round"
				transform={`
					translate(${size / 2}, ${size / 2})
					rotate(-90)
					scale(1, -1)
					translate(-${size / 2}, -${size / 2})
				`}
				strokeWidth={mainStrokeWidth}
			/>
		</Svg>
	)
}

export default RemainingTimeIndicator
