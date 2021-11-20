import { gql } from "@apollo/client";

export const GET_TODOS = gql`
	query Query { getTodos { id, title, completed } }
`