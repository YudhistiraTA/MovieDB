import {
	Button,
	Title,
	Paragraph,
	Divider,
	Avatar,
	Badge
} from "react-native-paper";
import {
	View,
	Image,
	StyleSheet,
	Linking,
	ScrollView
} from "react-native";
import { useQuery } from "@apollo/client";
import { GET_MOVIES_DETAIL } from "../config/queries";
import CastsCarousel from "../components/CastCarousel";
import SpinnerComponent from "../components/SpinnerComponent";

const Detail = ({ route }) => {
	const { id } = route.params;
	const { loading, data: movie } = useQuery(GET_MOVIES_DETAIL, {
		variables: {
			movieId: id
		}
	});
	if (loading)
		return <SpinnerComponent/>;
	return (
		<ScrollView style={styles.container}>
			<Image
				style={styles.image}
				source={{ uri: movie?.movie?.imgUrl }}
			/>
			<View style={styles.content}>
				<Title style={styles.title}>{movie?.movie?.title}</Title>
				<View style={styles.row}>
					<Badge>Genre: {movie?.movie?.Genre?.name}</Badge>
					<Badge>Posted by: {movie?.movie?.Author?.username}</Badge>
				</View>
				<Paragraph style={styles.synopsis}>
					{movie?.movie?.synopsis}
				</Paragraph>
				<Divider style={styles.divider} />
				<View style={styles.row}>
					<Avatar.Icon
						style={styles.icon}
						size={50}
						icon="star"
						color="yellow"
					/>
					<Title style={styles.rating}>{movie?.movie?.rating}</Title>
				</View>
				<Title>Casts</Title>
				<CastsCarousel
					data={movie?.movie?.Casts}
					style={{ marginBottom: 5 }}
				/>
				<Button
					mode="contained"
					style={styles.button}
					onPress={() => Linking.openURL(movie?.movie?.trailerUrl)}
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
