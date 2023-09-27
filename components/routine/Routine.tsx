import { useEffect, useState, useRef } from "react"
import { ImageBackground, Text, TouchableOpacity, View } from "react-native"
import Animated, { Easing, withSequence, useAnimatedStyle, useSharedValue, withTiming, withDelay } from "react-native-reanimated"
import RoutineSlot from "./RoutineSlot"
import { ScrollView } from "react-native-gesture-handler"
import { Icon } from "@react-native-material/core"

type Props = {
  dataArray: any[],
  selectedDay: number, 
  screenWidth: number,
}

const Routine: React.FC<Props> = ({ dataArray, selectedDay, screenWidth }) => {
  const [intState, setIntState] = useState(selectedDay)
  const [sessionsArray, setSessionsArray] = useState<any[]>([])
  const [currentScrollIndex, setCurrentScrollIndex] = useState<number>(0)
  const opacity = useSharedValue(0)
  const translateX = useSharedValue(screenWidth)

  const scrollRef = useRef<ScrollView>(null)
  const elementWidth = screenWidth / 100 * 65

  const animatedStyle = useAnimatedStyle(() => {
    return { opacity: opacity.value, transform: [{ translateX: translateX.value }] }
  })

  useEffect(() => {
    opacity.value = withSequence(
      withTiming(0, { duration: 150, easing: Easing.out(Easing.ease) }),
    )

    const timeoutId = setTimeout(() => {
      translateX.value = selectedDay > intState ? screenWidth : - screenWidth

      setIntState(selectedDay)

      opacity.value = withSequence(
        withDelay(50, withTiming(1, { duration: 150, easing: Easing.in(Easing.ease) }))
      )

      translateX.value = withTiming(0, { duration: 250, easing: Easing.out(Easing.exp) })
    }, 50)

    return () => clearTimeout(timeoutId)
  }, [selectedDay])

  useEffect(() => {
    const filteredData: any[] = dataArray
      .filter(data => data.day_id === intState + 1)
      .map(item => {
        const sessions = item.session_ids.split(',')
        const statuses = item.session_statuses.split(',')
        const phaseNames = item.phase_names.split(',')
        const programNames = item.program_names.split(',')
        const programThumbnails = item.program_thumbnails.split(',')

        return sessions.map((sessionId: string, index: number) => ({
          id: parseInt(sessionId),
          status: statuses[index],
          phase: phaseNames[index],
          program: programNames[index],
          thumbnail: programThumbnails[index]
        }))
      })
      .flat()

    setSessionsArray(filteredData)
  }, [dataArray, intState])

  useEffect(() => {
    scrollRef.current?.scrollTo({
      x: 0,
      animated: false
    })
  }, [intState])

  return (
    <Animated.View style={animatedStyle} className="flex-1 flex-col p-3">
      {sessionsArray.length === 0 ? (
        <ImageBackground
          source={require('../../assets/images/bg/comet.png')}
          className="flex-1 justify-center items-center"
          resizeMode="stretch"
        >
          <Text className="text-custom-white font-BaiJamjuree-Regular text-4xl">Rest</Text>
        </ImageBackground>
      ) : (
        <>
          <View className="h-[10%]">
            <Text className="text-custom-white font-BaiJamjuree-Bold">
              Sessions for the day:
            </Text>
          </View>
          <ScrollView 
            ref={scrollRef}
            horizontal={true} 
            directionalLockEnabled={true}
            fadingEdgeLength={100}
            disableIntervalMomentum={true}
            showsHorizontalScrollIndicator={false}
            decelerationRate='fast'
            snapToInterval={(elementWidth - (screenWidth - elementWidth)) * 2}
            alwaysBounceVertical={false}
            alwaysBounceHorizontal={false}
            overScrollMode="never"
            bounces={false}
          >
            {sessionsArray.map((session, index) => 
              <RoutineSlot 
                key={index} 
                session={session} 
                routineId={selectedDay + 1}
                elementWidth={elementWidth}
              />
            )}
            <TouchableOpacity
              className="h-full overflow-hidden border border-custom-grey rounded-xl flex justify-center items-center"
              style={{ width: elementWidth, backgroundColor: 'rgba(80, 80, 80, 0.15)' }}
              activeOpacity={0.5}
            >
              <Icon name="plus" size={50} color="#505050" />
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </Animated.View>
  )
}

export default Routine
