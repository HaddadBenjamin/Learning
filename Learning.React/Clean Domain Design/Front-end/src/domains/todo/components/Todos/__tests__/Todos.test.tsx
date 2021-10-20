import {useDispatch, useSelector} from "react-redux";
import {render} from "@testing-library/react";
import Todos from "../Todos";
import {todoStateMock} from "domains/todo/todo.mock";
import {getTodosRequestAction} from "domains/todo/todo.action";
import {act} from "react-dom/test-utils";
import useLazySaga from "../../../../../shared/domains/redux/lazyRedux/hooks/useLazySaga";
import useLazyReducer from "../../../../../shared/domains/redux/lazyRedux/hooks/useLazyReducer";

jest.mock('react-redux')
const mockUseDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>
const mockDispatch = jest.fn()

jest.mock('../../../../../shared/domains/redux/lazyStore/hooks/useLazySaga')
jest.mock('../../../../../shared/domains/redux/lazyStore/hooks/useLazyReducer')

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
    
    it("should dispatch getTodosRequestAction when component is mounted and todo reducer and saga are injected", async() =>
    {
        // Given
        (useSelector as jest.Mock).mockReturnValue(todoStateMock);
        (useLazySaga as jest.Mock).mockReturnValue(true);
        (useLazyReducer as jest.Mock).mockReturnValue(true);
       
        // When
        await act(async () => {
            render(<Todos/>)
        })

        // Then
        expect(mockDispatch).toBeCalledWith(getTodosRequestAction())
    })
})