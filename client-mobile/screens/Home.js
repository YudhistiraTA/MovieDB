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
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../config/queries";

export default function Home({ navigation }) {
	const { loading, error, data: movies } = useQuery(GET_MOVIES);
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
