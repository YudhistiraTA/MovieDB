import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./navigators/MainStack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<MainStack />
		</NavigationContainer>
	);
}
