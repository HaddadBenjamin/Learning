import {initialApplicationState} from "../root.state";
import store from "../root.store";

describe("root.reducer", () =>
{
    it("rootReducer should be equals to initialApplicationState", () => {
        // Given & When
        const state = store.getState()

        // Then
        expect(state).toEqual(initialApplicationState)
    })
})