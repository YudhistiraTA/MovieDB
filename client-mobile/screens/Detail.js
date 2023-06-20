import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
	MD3LightTheme as DefaultTheme,
	PaperProvider,
	Button
} from "react-native-paper";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function Detail({ navigation }) {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={{ flex: 1 }}>
				<PaperProvider style={theme}>
					<Button
						mode="contained"
						onPress={() => navigation.navigate("Home")}
					>
						To Home
					</Button>
					<StatusBar style="auto" />
				</PaperProvider>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "tomato",
		secondary: "yellow"
	}
};
