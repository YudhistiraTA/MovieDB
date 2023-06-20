import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import {
	MD3LightTheme as DefaultTheme,
	PaperProvider
} from "react-native-paper";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import BASE_URL from "../config/BASE_URL";
import MovieCard from "../components/MovieCard";

export default function Home({ navigation }) {
	const [movies, setMovies] = useState([]);
	useEffect(() => {
		fetch(BASE_URL + "/Movies")
			.then(async (res) => {
				if (!res.ok) {
					throw await res.text();
				}

				return res.json();
			})
			.then((data) => {
				setMovies(data);
			})
			.catch((err) => console.log(err));
	}, []);
	return (
		<SafeAreaProvider>
			<SafeAreaView style={{ flex: 1 }}>
				<PaperProvider>
					<FlatList
						data={movies}
						renderItem={({ item }) => <MovieCard movie={item} />}
						keyExtractor={(item) => item?.id}
					/>
					<StatusBar style="auto" />
				</PaperProvider>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}