import { ActivityIndicator, StyleSheet, View } from "react-native";

export default SpinnerComponent = () => {
	return (
		<View style={[styles.vertical, styles.horizontal]}>
			<ActivityIndicator size="large" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center"
	},
	horizontal: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 10
	}
});
