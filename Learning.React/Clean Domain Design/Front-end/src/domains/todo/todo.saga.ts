import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
   addTodoFailedAction,
   AddTodoRequestAction,
   addTodoSuccessAction,
   editTodoFailedAction,
   EditTodoRequestAction,
   editTodoSuccessAction,
   getTodosFailedAction, getTodosRequestAction,
   getTodosSuccessAction,
   removeTodoFailedAction,
   RemoveTodoRequestAction,
   removeTodoSuccessAction,
   TodoAction,
   toggleTodoFailedAction,
   ToggleTodoRequestAction,
   toggleTodoSuccessAction
} from './todo.action';
import {
   addTodo,
   getAllTodos,
   patchTitle,
   removeTodo,
   patchCompleted
} from './todo.api';
import { ITodo } from './todo.model';
import { selectTodos } from './todo.selector';
import { TodoState } from './todo.state';
import {createTodo} from "./todo.repository";

export function* getAllTodosSaga()
{
   try
   {
      const todos : ITodo[] = yield call(getAllTodos);
      yield put(getTodosSuccessAction(todos));
   }
   catch (error)
   {
      yield put(getTodosFailedAction(error.message));
   }
}

export function* addTodoSaga(action : AddTodoRequestAction)
{
   try {
      const newTodo: ITodo = yield call(addTodo, createTodo(action.payload.title));

      yield put(addTodoSuccessAction(newTodo));
      yield put(getTodosRequestAction());
   }
   catch (error)
   {
      yield put(addTodoFailedAction(error.message));
   }
}

export function* editTodoSaga(action : EditTodoRequestAction)
{
   try
   {
      const { id, title } = action.payload
      const editedTodo : ITodo = yield call(patchTitle, id, title);

      yield put(editTodoSuccessAction(editedTodo));
      yield put(getTodosRequestAction());
   }
   catch (error)
   {
      yield put(editTodoFailedAction(error.message));
   }
}

export function* toggleTodoSaga(action : ToggleTodoRequestAction)
{
   try
   {
      const { id } = action.payload      
      const todoState : TodoState = yield select(selectTodos);
      const todo : ITodo = todoState.todos.find(t => t.id === id) as ITodo
      const toggledTodo : ITodo = { ...todo, completed : !todo.completed}
   
      yield call(patchCompleted, id, toggledTodo.completed);
      yield put(toggleTodoSuccessAction(toggledTodo));
      yield put(getTodosRequestAction());
   }
   catch (error)
   {
      yield put(toggleTodoFailedAction(error.message));
   }
}

export function* removeTodoSaga(action : RemoveTodoRequestAction)
{
   try
   {
     const { id } = action.payload

     yield call(removeTodo, id);
     yield put(removeTodoSuccessAction(id));
      yield put(getTodosRequestAction());
   }
   catch (error)
   {
      yield put(removeTodoFailedAction(error.message));
   }
}

function* watchTodosSagas() {
  yield takeLatest(TodoAction.GET_TODOS_REQUEST, getAllTodosSaga);
  yield takeLatest(TodoAction.ADD_TODO_REQUEST, addTodoSaga);
  yield takeLatest(TodoAction.EDIT_TODO_REQUEST, editTodoSaga);
  yield takeLatest(TodoAction.TOGGLE_TODO_REQUEST, toggleTodoSaga);
  yield takeLatest(TodoAction.REMOVE_TODO_REQUEST, removeTodoSaga);
}

export default watchTodosSagas;