import {selectTodos} from "../todo.selector";
import {initialApplicationState} from "../../root/root.state";

describe("todo.selector", () =>
{
    it("selectTodos should be undefined", () =>
    {
        // Given & When
        const todoState = selectTodos(initialApplicationState)

        // Then
        expect(todoState).toBeUndefined()
    })
})