import { StatusBar } from "expo-status-bar";
import { FlatList } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import MovieCard from "../components/MovieCard";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../config/queries";

export default function Home() {
	const { loading, data: movies } = useQuery(GET_MOVIES);
	return (
		<SafeAreaProvider>
			<SafeAreaView style={{ flex: 1 }}>
				<PaperProvider>
					<FlatList
						data={movies?.movies.movies}
						renderItem={({ item }) => <MovieCard movie={item} />}
						keyExtractor={(item) => item?.id}
					/>
					<StatusBar style="auto" />
				</PaperProvider>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
