import Constants from 'expo-constants'

type expoConst =  {
    "API_ADDRESS": string,
    "INACTIVITY_WARNING": number,
    "INACTIVITY_TRIGGER": number
}

// @ts-expect-error
const expoEnv: expoConst = Constants.expoConfig!.extra!;

export default expoEnv;