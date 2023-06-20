import { useNavigation } from "@react-navigation/native";
import { Avatar, Button, Card, Text } from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const MovieCard = ({ movie }) => {
	const navigation = useNavigation();
	return (
		<Card style={{ margin: 10, padding: 10 }}>
			<Card.Cover source={{ uri: movie?.imgUrl }} />
			<Card.Content>
				<Text variant="titleLarge">{movie?.title}</Text>
				<Text variant="bodyMedium">{movie?.synopsis}</Text>
			</Card.Content>
			<Card.Actions>
				<Button
					onPress={() => navigation.navigate("Detail", { movie })}
				>
					Details
				</Button>
			</Card.Actions>
		</Card>
	);
};

export default MovieCard;
