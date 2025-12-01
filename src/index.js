import { registerRootComponent } from "expo";
import App from "./App";
import GlobalProviderWrapper from './components/GlobalProviderWrapper';
import CartListItem from "./components/CartListItem";
import fakeProductDb from "./utils/fakeProductDb";

import { View } from 'react-native';


function Root() {
    // return (
    //     <GlobalProviderWrapper>
    //         <App />
    //     </GlobalProviderWrapper>
    // )

    return (
        <View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
            <CartListItem cartItem={{...fakeProductDb[0], quantity: 2}} decrease={() => {}} increase={() => {}} />
        </View>
    )
}

registerRootComponent(Root);
