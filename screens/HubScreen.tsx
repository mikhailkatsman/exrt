import { useState, useEffect, ComponentType } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Calendar from "@components/calendar/Calendar";
import Routine from "@components/routine/Routine";
import Actions from "@components/actions/Actions";
import DB from '@modules/DB'

import type { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const HubScreen: ComponentType<Props> = ({ navigation }) => {
  const [dayNow, setDayNow] = useState<number>(0)
  const [dataArray, setDataArray] = useState<any[]>([])
  const [selectedDay, setSelectedDay] = useState<number>(dayNow)

  useEffect(() => {
    const dateData: Date = new Date()
    const dayNowData: number = (dateData.getDay() + 6) % 7 
    setDayNow(dayNowData)

    DB.sql(`
      SELECT weekly_session_instances.day_id AS day_id,
             GROUP_CONCAT(sessions.id, ',') AS session_ids,
             GROUP_CONCAT(sessions.time, ',') AS session_times
      FROM weekly_session_instances
      JOIN sessions ON weekly_session_instances.session_id = sessions.id
      GROUP BY weekly_session_instances.id, weekly_session_instances.day_id;
      `, [],
      (_, result) => {
        setDataArray(result.rows._array)
      }
    ) 
  }, [])

  const navigate = () => {
    navigation.navigate('NewSession', {
      routineId: selectedDay + 1,
    })
  }


  return (
    <GestureHandlerRootView className="bg-custom-dark h-full w-full px-2">
      <Calendar 
        dataArray={dataArray}
        dayNow={dayNow}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      /> 
      <Routine 
        dataArray={dataArray}
        selectedDay={selectedDay}
      />
      <Actions
        handleNavigate={navigate}
      />
    </GestureHandlerRootView>
  )
}

export default HubScreen
