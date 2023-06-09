import { ComponentType, useState } from "react";
import { View, Text, Pressable } from "react-native";
import ScrollPicker from "../common/ScrollPicker";

const ScrollPickerGrid: ComponentType = () => {
  const [weighted, setWeighted] = useState<boolean>(false)
  const [timed, setTimed] = useState<boolean>(false)

  const setValues: number[] = [];
  const repValues: number[] = [];
  const kgValues: number[] = [];
  const timeValues: string[] = [];

  for (let i = 1; i <= 10; i++) setValues.push(i);
  for (let i = 1; i <= 50; i++) repValues.push(i);
  for (let i = 0; i <= 100; ) {
    kgValues.push(i);
    if (i < 10) i += 0.25;
    else if (i < 20) i += 0.5;
    else if (i < 30) i ++;
    else i += 10;
  }
  for (let i = 0; i <= 59; i++) timeValues.push(i.toString().padStart(2, '0'));

  return (
    <View className="h-[25%] w-full mb-3 px-2">
      <View className="h-[50%] w-full flex-row mb-3">
	<View className="flex-1 flex-row items-center justify-start">
	  <Text className="w-12 text-custom-white text-xl">Sets</Text>
	  <ScrollPicker dataArray={setValues} width={50} />
	</View>
	  {weighted ? (
	    <View className="flex-1 flex-row items-center justify-end">
	      <Text className="text-custom-white text-xl">Weight</Text>
	      <ScrollPicker dataArray={kgValues} width={60} />
	      <Text className="text-custom-white text-lg">kg</Text>
	    </View>
	  ) : (
	    <View className="flex-1 flex-row items-center justify-end">
	      <Pressable onPress={() => setWeighted(true)}>
		<Text className="text-custom-blue text-xl">Set Weight</Text>
	      </Pressable>
	    </View>
	  )}
      </View>
      <View className="h-[50%] w-full flex-row mb-2">
	<View className="flex-1 flex-row items-center justify-start">
	  <Text className="w-12 text-custom-white text-xl">Reps</Text>
	  <ScrollPicker dataArray={repValues} width={50} />
	</View>
	{timed ? (
	  <View className="flex-1 flex-row items-center justify-end">
	    <Text className="text-custom-white text-xl mr-1">Duration</Text>
	    <ScrollPicker dataArray={timeValues} width={40} />
	    <Text className="text-custom-white text-lg">m</Text>
	    <ScrollPicker dataArray={timeValues} width={40} />
	    <Text className="text-custom-white text-lg">s</Text>
	  </View>
	) : (
	  <View className="flex-1 flex-row items-center justify-end">
	    <Pressable onPress={() => setTimed(true)}>
	      <Text className="text-custom-blue text-xl">Set Duration</Text>
	    </Pressable>
	  </View>
	)}
      </View>
    </View>
  )
}

export default ScrollPickerGrid
