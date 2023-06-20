import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../screens/Detail";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator();

export default function MainStack() {
	return (
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="Detail" component={Detail} />
		</Stack.Navigator>
	);
}
