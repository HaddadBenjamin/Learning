import {createTodo} from "../todo.repository";
import {todoTitleMock} from "../todo.mock";

describe("todo.repository", () =>
{
    it("createTodo should set completed to false and title retrieved from parameter", () =>
    {
        // Given & When
        const todo = createTodo(todoTitleMock)

        // Then
        expect(todo).toEqual(expect.objectContaining({
            title : todoTitleMock,
            completed : false
        }))
    })
})