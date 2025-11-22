import { registerRootComponent } from "expo";
import App from "./App";
import GlobalProviderWrapper from './components/GlobalProviderWrapper';

function Root() {
    return (
        <GlobalProviderWrapper>
            <App />
        </GlobalProviderWrapper>
    )
}

registerRootComponent(Root);
