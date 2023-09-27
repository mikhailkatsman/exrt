import React, { useEffect, useState } from "react"
import { TouchableOpacity, Text, View, ScrollView, Image } from "react-native"
import DB from '@modules/DB'
import TimeSlotInstanceCard from "@components/common/TimeSlotInstanceCard"
import { Icon } from "@react-native-material/core"
import { useNavigation } from "@react-navigation/native"
import { LinearGradient } from "expo-linear-gradient"
import { programThumbnails } from "@modules/AssetPaths"

type Props = {
  routineId: number,
  session: {
    id: number,
    status: string,
    phase: string,
    program: string,
    thumbnail: string,
  },
  elementWidth: number,
}

const RoutineSlot: React.FC<Props> = ({
  session, 
  routineId, 
  elementWidth
}) => {
  const [instances, setInstances] = useState<any[]>([])

  const navigation = useNavigation()


  useEffect(() => {
    DB.sql(`
      SELECT exercise_instances.id AS id, 
             exercise_instances.sets AS sets, 
             exercise_instances.reps AS reps, 
             exercise_instances.minuteDuration AS minuteDuration, 
             exercise_instances.secondDuration AS secondDuration, 
             exercise_instances.weight AS weight,
             exercises.name AS name,
             exercises.thumbnail AS thumbnail
      FROM session_exercise_instances
      JOIN exercise_instances
      ON session_exercise_instances.exercise_instance_id = exercise_instances.id
      JOIN exercises
      ON exercise_instances.exercise_id = exercises.id
      WHERE session_exercise_instances.session_id = ?
      ORDER BY instance_order ASC;
    `, [session.id],
    (_: any, result: any) => {
      const instanceData = result.rows._array.map((row: any) => ({
        id: row.id,
        name: row.name,
        thumbnail: row.thumbnail,
        sets: row.sets,
        reps: row.reps || null,
        minuteDuration: row.minuteDuration || null,
        secondDuration: row.secondDuration || null,
        weight: row.weight || null
      }))

      setInstances(instanceData)
    })
  }, [session])

  const renderStatus = () => {
    if (session.status === 'completed') {
      return (
        <Text className="text-custom-green font-BaiJamjuree-BoldItalic text-sm">
          Completed
        </Text>
      )
    } else if (session.status === 'missed') {
      return (
        <Text className="text-custom-red font-BaiJamjuree-BoldItalic text-sm">
          Missed 
        </Text>
      )
    } else {
      return (
        <Text className="text-custom-blue font-BaiJamjuree-BoldItalic text-sm">
          Upcoming
        </Text>
      )
    }
  }

  const renderGradient = () => {
    if (session.status === 'completed') {
      return (
        <LinearGradient
          className="absolute w-full h-full"
          colors={['rgba(18, 18, 18, 0.6)', '#74AC5D', '#121212']}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.45, 1]}
        />
      )
    } else if (session.status === 'missed') {
      return (
        <LinearGradient
          className="absolute w-full h-full"
          colors={['rgba(18, 18, 18, 0.6)', '#F4533E', '#121212']}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.45, 1]}
        />
      )
    } else {
      return (
        <LinearGradient
          className="absolute w-full h-full"
          colors={['rgba(18, 18, 18, 0.6)', '#5AABD6', '#121212']}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.45, 1]}
        />
      )
    }
  }

  return (
    <View 
      className="h-full mr-6"
      style={{ width: elementWidth }}
    >
      <View className="h-[85%] flex-col overflow-hidden rounded-t-2xl rounded-b border border-custom-blue">
        {renderGradient()}
        <Image 
          className="absolute w-full h-1/2 -z-10"
          resizeMode="cover"
          source={
            programThumbnails[session.thumbnail as keyof typeof programThumbnails] || 
            {uri: session.thumbnail}
          }
        />
        <View className="h-[8%] mt-3 mx-3 flex-row justify-between">
          {renderStatus()}
          <TouchableOpacity 
            className="w-[25%] items-end justify-start mt-1"
            onPress={() => navigation.navigate("EditSession", { 
              routineId: routineId,
              sessionExists: true,
              sessionId: session.id, 
            })}
          >
            <Icon name="pencil" size={18} color="#F5F6F3" />
          </TouchableOpacity>
        </View>
        <View className="h-[16%] mx-3">
          <Text className="text-custom-white font-BaiJamjuree-Bold text-lg">
            {session.phase}
          </Text>
        </View>
        <View className="h-[16%] mx-3">
          <Text className="text-custom-white font-BaiJamjuree-RegularItalic text-xs">
            Program:
          </Text>
          <Text className="text-custom-white font-BaiJamjuree-Bold">
            {session.program}
          </Text>
        </View>
        <View className="flex-1 mx-3 mb-3">
          <Text className="mb-2 text-custom-white font-BaiJamjuree-RegularItalic text-xs">
            Exercises:
          </Text>
          <ScrollView 
            className="flex-1"
            fadingEdgeLength={100}
          >
            {instances.map((instance, index) => (
              <>
                <TimeSlotInstanceCard 
                  key={`instance-${index}`}
                  id={instance.id}
                  name={instance.name}
                  thumbnail={instance.thumbnail}
                  sets={instance.sets}
                  reps={instance.reps}
                  minuteDuration={instance.minuteDuration}
                  secondDuration={instance.secondDuration}
                  weight={instance.weight}
                />
                {index < instances.length - 1 && <View key={`spacer-${index}`} className="h-3" />}
              </>
            ))}
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity 
        className="
          mt-1 flex-1 flex-row items-center justify-center
          rounded-b-2xl rounded-t border border-custom-blue
        "
        onPress={() => navigation.navigate("GetReady", {
          sessionId: session.id,
        })}
      >
        <Text className="mr-4 mt-1 text-custom-blue font-BaiJamjuree-Bold text-lg">Start Session</Text>
        <Icon name="dumbbell" size={24} color="#5AABD6" />
      </TouchableOpacity>
    </View>
  )
}

export default RoutineSlot
