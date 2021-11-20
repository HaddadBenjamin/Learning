const { ApolloServer, gql } = require("apollo-server");
const { getTodos, getTodoById, addTodo, updateTodo, deleteTodo } = require("./todo.manager");

const typeDefs = gql`
    type Todo
    {
        id: ID!
        title: String!
        completed: Boolean!
    }
    
    input AddTodoDto
    {
        id: ID!
        title: String!
        completed: Boolean!
    }

    input UpdateTodoDto
    {
        id: ID!
        title: String!
        completed: Boolean!
    }
    
    type Query
    {
        getTodo(id: ID!): Todo!
        getTodos: [Todo!]!
    }
    
    type Mutation
    {
        createTodo(todo: AddTodoDto): Todo
        updateTodo(todo: UpdateTodoDto): Todo
        deleteTodo(id: ID!): Todo
    }
`;

const resolvers =
{
    Query:
    {
        getTodo: (parent, { id }) => getTodoById(id),
        getTodos: (parent, args) => getTodos()
    },

    Mutation:
    {
        createTodo: (parent, { todo }) => addTodo(todo),
        updateTodo: (parent, { todo }) => updateTodo(todo),
        deleteTodo: (parent, { id }) => deleteTodo(id)
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) =>
{
    console.log(`Server ready at ${url}`);
});