import { View, StyleSheet, Text } from "react-native"
import IncrementButton from "./IncrementButton";
import { CartItem } from "../contexts/cartContext";

const style = StyleSheet.create({

})

type CartListItemProps = {
    cartItem: CartItem,
    increase: () => void,
    decrease: () => void
}

export default function CartListItem({ cartItem, increase, decrease }: CartListItemProps) {
  const { name, price, quantity } = cartItem;
  
  return (
    <View>
      <Text>{name}</Text>
      <Text>{price}</Text>
      <IncrementButton callback={increase} isDecremental={false}/>
      <Text>{quantity}</Text>
      <IncrementButton callback={decrease} isDecremental={true}/>
    </View>
  )
}