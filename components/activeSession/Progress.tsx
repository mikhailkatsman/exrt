import { useEffect, useState } from "react"
import { Text, View } from "react-native"

type Props = {
	totalActivities: any[],
	currentActivity: number
}

const Progress: React.FC<Props> = ({ totalActivities, currentActivity }) => {
	const [sessionTime, setSessionTime] = useState<number>(0)

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0')
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0')
    const seconds = (totalSeconds % 60).toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }

	useEffect(() => {
    const timeValue = setInterval(() => {
      setSessionTime(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timeValue)
	}, [])

	return (
		<View className="w-full mb-3 flex-col items-center">
			<Text className="text-custom-white font-BaiJamjuree-Bold mb-1">
				{formatTime(sessionTime)}
			</Text>	
			<View className="w-full rounded-lg overflow-hidden flex-row items-center">
				{totalActivities.map((_, index) => (
					<View 
						key={index} 
						className=
							{`flex-1 ${index < currentActivity ? 'bg-custom-green h-0.5' : index === currentActivity ? 'bg-custom-red h-1.5 rounded-xl' : 'bg-custom-grey h-0.5'}`} 
					/>
				))}
			</View>
		</View>
	)
}

export default Progress
