import React from "react";
import { Button, Title, Paragraph, Divider, Avatar } from "react-native-paper";
import { View, Image, StyleSheet, Linking, ScrollView } from "react-native";

const Detail = ({ route }) => {
	const { movie } = route.params;

	return (
		<ScrollView style={styles.container}>
			<Image style={styles.image} source={{ uri: movie?.imgUrl }} />
			<View style={styles.content}>
				<Title style={styles.title}>{movie?.title}</Title>
				<Paragraph style={styles.synopsis}>{movie?.synopsis}</Paragraph>
				<Divider style={styles.divider} />
				<View style={styles.row}>
					<Avatar.Icon
						style={styles.icon}
						size={50}
						icon="star"
						color="yellow"
					/>
					<Title style={styles.rating}>{movie?.rating}</Title>
				</View>
				<Button
					mode="contained"
					style={styles.button}
					onPress={() => Linking.openURL(movie?.trailerUrl)}
				>
					Watch Trailer
				</Button>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	image: {
		height: 300,
		width: "100%"
	},
	content: {
		padding: 16
	},
	title: {
		fontSize: 24,
		marginBottom: 10
	},
	synopsis: {
		fontSize: 16,
		marginBottom: 10
	},
	divider: {
		marginVertical: 10
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10
	},
	icon: {
		marginRight: 10
	},
	rating: {
		fontSize: 20
	},
	button: {
		marginTop: 10
	}
});

export default Detail;
