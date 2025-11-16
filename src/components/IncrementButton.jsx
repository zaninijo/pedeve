import { Text, TouchableOpacity } from 'react-native'

const style = StyleSheet.create({

})

export default function IncrementButton({callback, isDecremental}) {
  return (
    <TouchableOpacity onPress={callback}>
      {
        /* TODO: Colocar elemento gráfico aqui dentro mais tarde */
        isDecremental
        ? <Text>-</Text>
        : <Text>+</Text>
      }
    </TouchableOpacity>
  )
}