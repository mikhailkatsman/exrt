import { Text, View, Image, TouchableOpacity, Pressable } from "react-native"
import { exerciseThumbnails } from "@modules/AssetPaths"
import { Icon } from "@react-native-material/core"

type Props = {
  id: number,
  selectedId: number | null,
  setSelectedId: (id: number) => void,
  name: string,
  thumbnail: keyof typeof exerciseThumbnails,
}

const InstanceCard: React.FC<Props> = ({ id, selectedId, setSelectedId, name, thumbnail }) => {

  return (
    <Pressable className={`
      w-full h-16 mb-2 p-1 flex-row border-2 rounded-xl
      ${selectedId === id ? 'border-custom-blue' : ' border-custom-dark'}
      `}
      onPress={() => setSelectedId(id)}
    >
      <Image
        className={`w-1/6 h-full rounded-lg ${selectedId === id || !selectedId ? '' : 'opacity-50'}`}
        resizeMode="contain" 
        source={exerciseThumbnails[thumbnail]} 
      />
      <View className="w-2/3 pl-3 flex-col justify-center">
        <Text className={`${selectedId === id || !selectedId ? 'text-custom-white' : 'text-custom-grey'} font-BaiJamjuree-Regular text-lg`}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Text>
      </View>
      <TouchableOpacity className="w-1/6 flex justify-center items-center">
        <Icon name="information-outline" size={24} color={selectedId === id || !selectedId ? '#F5F6F3' : '#4D594A'} />
      </TouchableOpacity>
    </Pressable>
  )
}

export default InstanceCard
