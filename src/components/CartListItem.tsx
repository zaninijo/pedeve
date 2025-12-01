import { View, StyleSheet, Text } from "react-native"
import IncrementButton from "./IncrementButton";
import { CartItem } from "../contexts/CartContext";
import { colorDict, textStyle } from "../styles/globalStyles";
import toBRL from "../utils/brlFormat";

const style = StyleSheet.create({

})

type CartListItemProps = {
    cartItem: CartItem,
    increase: () => void,
    decrease: () => void
}

export default function CartListItem({ cartItem, increase, decrease }: CartListItemProps) {

  const { name, price, quantity } = cartItem;

  let quantityTag = quantity.toString();
  quantityTag =  (quantityTag.length < 2) ? "0" + quantityTag : quantityTag;

  return (
    <View style={{backgroundColor: colorDict.white, flexDirection: "row", width: "100%", gap: 8, padding: 10}}>
      <Text style={{flexGrow: 1}}>{name}</Text>
      <Text>{toBRL(price)}</Text>
      <IncrementButton callback={increase} isDecremental={false}/>
      <Text style={[textStyle.m_mono, {fontSize: 16}]}>{quantityTag}</Text>
      <IncrementButton callback={decrease} isDecremental={true}/>
    </View>
  )
}