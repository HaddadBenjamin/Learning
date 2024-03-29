import {fireEvent, render} from "@testing-library/react";
import AddTodo from "../AddTodo";
import {useDispatch} from "react-redux";
import {addTodoRequestAction} from "domains/todo/todo.action";
import {todoTitleMock} from "domains/todo/todo.mock";
import React from "react";

jest.mock('react-redux')
const mockUseDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>
const mockDispatch = jest.fn()

describe("AddTodo", () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    
    afterEach(() => jest.clearAllMocks());
    
    beforeEach(() => (mockUseDispatch as jest.Mock).mockReturnValue(mockDispatch))
    
    it("should match snapshot", () => {
        // Given & When
        const {container} = render(<AddTodo/>)
        
        // Then
        expect(container).toMatchSnapshot()
    })

    it("should dispatch addTodoRequestAction when title changed and button has been clicked", () =>
    {
        // Given
        const { container, getByText } = render(<AddTodo />)
        const input = container.getElementsByTagName('input')[0]
        const button = getByText('+')
    
        // When
        fireEvent.change(input, {target: {value: todoTitleMock}})
        fireEvent.click(button)
    
        // Then
        expect(input.value).toBe(todoTitleMock)
        expect(mockDispatch).toBeCalledWith(addTodoRequestAction(todoTitleMock))
    })
    
    it("should call setTitle when the input receive a change event", () => {
        // Given
        jest.spyOn(React, 'useState').mockImplementation(useStateMock);
        const {container} = render(<AddTodo/>)
        const input = container.getElementsByTagName('input')[0]
        
        // When
        fireEvent.change(input, {target: {value: todoTitleMock}})
        
        // Then
        expect(setState).toHaveBeenCalledTimes(1)
        expect(setState).toBeCalledWith(todoTitleMock)
    })
})