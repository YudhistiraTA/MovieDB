import { useNavigation } from "@react-navigation/native";
import { Avatar, Button, Card, Text } from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const MovieCard = ({ movie }) => (
		<Card>
			<Card.Cover source={{ uri: movie?.imgUrl }} />
			<Card.Content>
				<Text variant="titleLarge">{movie?.title}</Text>
				<Text variant="bodyMedium">{movie?.synopsis}</Text>
			</Card.Content>
			<Card.Actions>
				<Button>Cancel</Button>
				<Button>Ok</Button>
			</Card.Actions>
		</Card>
);

export default MovieCard;
