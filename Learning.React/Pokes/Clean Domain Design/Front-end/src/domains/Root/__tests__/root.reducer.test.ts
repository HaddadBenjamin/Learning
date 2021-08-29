import {initialTodoState} from "../../Todo/todo.state";
import rootReducer from "../root.reducer";
import {createStore} from "redux";
import store from "../root.store";

describe("root.reducer", () =>
{
    it("rootReducer.state should be equals to initialState", () => {
        // Given & When
        const todoState = store.getState().todos

        // Then
        expect(todoState).toEqual(initialTodoState)
    })
})