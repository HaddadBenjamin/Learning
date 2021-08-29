import {initialTodoState} from "../../Todo/todo.state";
import rootReducer from "../root.reducer";
import {createStore} from "redux";

describe("root.reducer", () =>
{
    it("rootReducer.state should be equals to initialState", () => {
        // Given & When
        const store = createStore(rootReducer)

        const todoState = store.getState().todos

        expect(todoState).toEqual(initialTodoState)
    })
})