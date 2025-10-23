import { registerRootComponent } from "expo";
import App from "./App";
import GlobalProviderWrapper from './contexts/globalProviderWrapper';

function Root() {
    return (
        <GlobalProviderWrapper>
            <App />
        </GlobalProviderWrapper>
    )
}

registerRootComponent(Root);
