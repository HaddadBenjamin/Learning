import ITodo from './todo.model'
import { TodoActions, TodosAction } from './todo.action'
import { newGuid } from '../shared/stringHelper'

export interface ITodosState { todos : ITodo[] }

export const initialTodoState : ITodosState =
{
    todos : [
        { title : 'Préparer la démo de demain', completed : false, bookmarked : false, id : '1', subTasks : ['Créer une build', 'Tester sur autre machine'], note : '', description : '' },
        { title : 'Partager les rendus UI à mes collègues', completed : false, bookmarked : true, id : '2', subTasks : [], note : '', description : '' },
        { title : 'Ranger mon bureau', completed : false, bookmarked : false, id : '3', subTasks : [], note : '', description : '' },
        { title : 'Préparer le café', completed : true, bookmarked : false, id : '4', subTasks : [], note : '', description : '' },
    ]
}
    
export default function todoReducer(state : ITodosState = initialTodoState, action : TodosAction) : ITodosState
{   
    switch (action.type)
    {
        case TodoActions.CREATE_TODO :
            return {
                ...state,
                todos : [ ...state.todos, { title : action.payload.title, completed : false, bookmarked : false, id : newGuid(), subTasks : [], note : '', description : '' } ]
            }

        case TodoActions.UPDATE_TODO :
            return { 
                ...state,
                todos : state.todos.map(todo => todo.id === action.payload.todo.id ?
                                        action.payload.todo : todo)
            }

        case TodoActions.TOGGLE_TODO :
            return { 
                ...state, 
                todos : state.todos.map(todo => todo.id === action.payload.id ?
                                        { ...todo, completed : !todo.completed } : todo)
            }
    
        case TodoActions.BOOKMARK_TODO :
                return { 
                    ...state, 
                    todos : state.todos.map(todo => todo.id === action.payload.id ?
                                            { ...todo, bookmarked : !todo.bookmarked } : todo)
                }

        // Without this line, the state is undefined at first init
        default : return state
    }
}