import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
	query Query {
		movies {
			movies {
				id
				title
				synopsis
				trailerUrl
				imgUrl
				rating
				Casts {
					id
					name
					profilePict
				}
				Genre {
					id
					name
				}
			}
			Error {
				name
				message
			}
		}
	}
`;
export const GET_MOVIES_DETAIL = gql`
	query Query($movieId: Int!) {
		movie(id: $movieId) {
			id
			title
			synopsis
			trailerUrl
			imgUrl
			rating
			Casts {
				id
				name
				profilePict
			}
			Genre {
				id
				name
			}
			Author {
				_id
				username
				email
				role
				phoneNumber
				address
			}
			Error {
				name
				message
			}
		}
	}
`;
