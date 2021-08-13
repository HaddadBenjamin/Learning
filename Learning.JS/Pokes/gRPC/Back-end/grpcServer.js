const { grpcOptions, grpcServerUrl } = require ("../grpc.configs.js");
const {getTodoById, getAllTodos, addTodo, updateTodo, removeTodo } = require("./todo.manager");
let grpc = require("grpc");
let protoLoader = require("@grpc/proto-loader");
let customersProto = grpc.loadPackageDefinition(protoLoader.loadSync("../todo.model.proto", grpcOptions));
const server = new grpc.Server();

const grpcNotFoundResponse = { code: grpc.status.NOT_FOUND, details: "Not found" }
server.addService(customersProto.CustomerService.service, {
    getAll: (_, callback) => callback(null, { todos : getAllTodos() }),

    get: (call, callback) =>
    {
        const todo = getTodoById(call.request.id);

        if (todo) callback(null, todo);
        else callback(grpcNotFoundResponse);
    },

    insert: (call, callback) => callback(null, addTodo(call.request)),

    update: (call, callback) => callback(null, updateTodo(call.request)),

    remove: (call, callback) =>
    {
        removeTodo(call.request)

        callback(null, {})
    }
});

server.bind(grpcServerUrl, grpc.ServerCredentials.createInsecure()); // votre serveur écoute une url & port
console.log(`Server running at ${grpcServerUrl}`);
server.start(); // lance votre serveur
