const { ApolloServer, gql } = require("apollo-server");
const { getTodos, getTodoById, addTodo, updateTodo, deleteTodo } = require("./todo.manager");

const typeDefs = gql`
    type Todo { id: ID! title: String! completed: Boolean! }
    type TodoId { id : ID! }
    
    input AddTodoRequest { id: ID! title: String! completed: Boolean! }
    input UpdateTodoRequest { id: ID! title: String! completed: Boolean! }
    input DeleteTodoRequest { id: ID! }
    
    type Query
    {
        getTodo(id: ID!): Todo!
        getTodos: [Todo!]!
    }
    
    type Mutation
    {
        createTodo(todo: AddTodoRequest): Todo
        updateTodo(todo: UpdateTodoRequest): Todo
        deleteTodo(request: DeleteTodoRequest): TodoId
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
        deleteTodo: (parent, { request }) => deleteTodo(request)
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) =>
{
    console.log(`Server ready at ${url}`);
});