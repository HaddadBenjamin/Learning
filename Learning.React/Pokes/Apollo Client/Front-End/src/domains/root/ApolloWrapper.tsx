import {FC} from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient(
	{
		uri: "http://localhost:4000/",
		cache: new InMemoryCache()
	}
)
export const ApolloWrapper : FC = ({ children }) =>
	<ApolloProvider client={client}>
		{children}
	</ApolloProvider>