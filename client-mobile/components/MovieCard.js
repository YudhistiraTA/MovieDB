import { useNavigation } from "@react-navigation/native";
import { Avatar, Button, Card, Text } from "react-native-paper";


const MovieCard = ({ movie }) => {
	const navigation = useNavigation();
	return (
		<Card style={{ margin: 10, padding: 10 }}>
			<Card.Cover source={{ uri: movie?.imgUrl }} />
			<Card.Content style={{ gap: 10, marginTop: 10 }}>
				<Text variant="titleLarge">{movie?.title}</Text>
				<Text variant="bodyMedium">{movie?.synopsis}</Text>
			</Card.Content>
			<Card.Actions>
				<Button
					style={{ margin: 20 }}
					onPress={() => navigation.navigate("Detail", { id: movie.id })}
				>
					Details
				</Button>
			</Card.Actions>
		</Card>
	);
};

export default MovieCard;
