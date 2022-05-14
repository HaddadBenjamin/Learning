import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools"
import {FC} from "react";
import React from "react";

const queryClient = new QueryClient()

const ReactQueryProvider: FC = ({children}) =>
	<QueryClientProvider client={queryClient}>
		{children}
		<ReactQueryDevtools initialIsOpen={false}/>
	</QueryClientProvider>

export default ReactQueryProvider