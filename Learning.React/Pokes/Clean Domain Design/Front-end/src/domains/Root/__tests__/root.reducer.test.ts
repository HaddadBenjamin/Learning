import store from "../root.store";
import {initialApplicationState} from "../root.state";

describe("root.reducer", () =>
{
    it("rootReducer should be equals to initialApplicationState", () => {
        // Given & When
        const state = store.getState()

        // Then
        expect(state).toEqual(initialApplicationState)
    })
})