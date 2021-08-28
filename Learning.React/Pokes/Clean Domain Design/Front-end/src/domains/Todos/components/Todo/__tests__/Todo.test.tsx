import {fireEvent, render} from "@testing-library/react";
import Todo from "../Todo";
import {useDispatch} from "react-redux";
import {todoMock} from "../../../todos.mock";
import {editTodoRequestAction, removeTodoRequestAction, toggleTodoRequestAction} from "../../../todos.actions";

jest.mock('react-redux')
const mockUseDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>
const mockDispatch = jest.fn()

describe("Todo", () => {
    beforeEach(() => {
        (mockUseDispatch as jest.Mock).mockReturnValue(mockDispatch)
    })

    it("should match snapshot", () => {
        // Given & When
        const {container} = render(<Todo {...todoMock} />)

        // Then
        expect(container).toMatchSnapshot()
    })

    it("should dispatch editTodoRequestAction when title change", () =>
    {
        // Given
        const {container} = render(<Todo {...todoMock} />)
        const input = container.getElementsByTagName('input')[1]
        const newTitle = "Ranger le linge"

        // When
        fireEvent.change(input, {target: {value: newTitle}})

        // Then
        expect(mockDispatch).toBeCalledWith(editTodoRequestAction(todoMock.id, newTitle))
    })

    it("should dispatch toggleTodoRequestAction when toggle is check", () =>
    {
        // Given
        const {container} = render(<Todo {...todoMock} />)
        const toggle = container.getElementsByTagName('input')[0]

        // When
        fireEvent.click(toggle)

        // Then
        expect(mockDispatch).toBeCalledWith(toggleTodoRequestAction(todoMock.id))
    })

    it("should dispatch removeTodoRequestAction when remove button is clicked", () =>
    {
        // Given
        const {getByText} = render(<Todo {...todoMock} />)
        const removeButton = getByText('X')

        // When
        fireEvent.click(removeButton)

        // Then
        expect(mockDispatch).toBeCalledWith(removeTodoRequestAction(todoMock.id))
    })
})