import {useDispatch, useSelector} from "react-redux";
import {render} from "@testing-library/react";
import Todos from "../Todos";
import {todoStateMock} from "domains/todo/todo.mock";
import {getTodosRequestAction} from "domains/todo/todo.action";
import {act} from "react-dom/test-utils";
import {lazyStore} from "../../../../root/root.store";
import {todoReducerKey, todoSagaKey} from "../../../todo.configuration";
import todoReducer from "../../../todo.reducer";
import {todoSaga} from "../../../todo.saga";

jest.mock('react-redux')
const mockUseDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>
const mockDispatch = jest.fn()

describe("Todos", () => {
    beforeEach(() => {
        (mockUseDispatch as jest.Mock).mockReturnValue(mockDispatch)
    })

    it("should match snapshot", async () => {
        // Given
        (useSelector as jest.Mock).mockReturnValue(todoStateMock)

        // When
        const {container} = render(<Todos/>)

        // Then
        expect(container).toMatchSnapshot()
    })
    
    it("should inject todo reducer and todo saga when component is mounted", async() =>
    {
        // Given
        const injectReducerSpy = jest.spyOn(lazyStore, "injectReducer")
        const injectSagaSpy = jest.spyOn(lazyStore, "injectSaga")
    
        // When
        await act(async () => {
            render(<Todos/>)
        })
    
        // Then
        expect(injectReducerSpy).toBeCalledWith(todoReducerKey, todoReducer)
        expect(injectSagaSpy).toBeCalledWith(todoSagaKey, todoSaga)
    })
    
    it("should dispatch getTodosRequestAction when component is mounted", async() =>
    {
        // Given
        (useSelector as jest.Mock).mockReturnValue(todoStateMock)
       
        // When
        await act(async () => {
            render(<Todos/>)
        })

        // Then
        expect(mockDispatch).toBeCalledWith(getTodosRequestAction())
    })
})