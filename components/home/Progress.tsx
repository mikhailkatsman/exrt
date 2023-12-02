import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

type Props = {
	dayIds: number[],
	dayNow: number,
	screenWidth: number,
}

const Progress: React.FC<Props> = ({ dayIds, dayNow, screenWidth }) => {
  const week: string[] = ["M", "T", "W", "T", "F", "S", "S"]

	const navigation = useNavigation()

	return (
		<TouchableOpacity 
			className="px-2 h-[14%] w-full"
			onPress={() => navigation.navigate('Hub', { dayNow: dayNow, screenWidth: screenWidth })}
			activeOpacity={0.6}
		>
			<Text className="mb-5 text-custom-white font-BaiJamjuree-BoldItalic">Continue Your Progress</Text>
			<View className='flex-1 flex-row justify-around gap-1'>
				{week.map((item, index) => (
					<View 
						key={index}
						className={`flex-col items-center justify-center flex-1
						${dayIds.includes(index + 1) ? 'border-2 border-custom-white rounded-2xl' : ''}`}
					>
						<Text 
							className={`font-BaiJamjuree-Bold 
							${index === dayNow ? 'text-custom-red' : 'text-custom-white'}`}
						>
							{item}
						</Text>
					</View>
				))}
			</View>
		</TouchableOpacity>
	)
}

export default Progress
