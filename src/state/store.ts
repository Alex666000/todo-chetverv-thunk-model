import {TasksActionsType, tasksReducer} from "./tasks-reducer";
import {SetTodolistsActionType, TodoActionsType, todolistsReducer} from "./todolists-reducer";
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer,applyMiddleware(thunkMiddleware));

export type AppActionsType = TodoActionsType | TasksActionsType

// определить автоматически тип всего объекта состояния
export type RootStateType = ReturnType<typeof store.getState>
// вместо этого типа используем другой
// export type AppDispatch = typeof store.dispatch
// вот этот:
// export type AppDispatch = ThunkDispatch<RootStateType, unknown, AnyAction>

// теперь вместо AnyActions и с AppThunk тоже самое
export type AppDispatch = ThunkDispatch<RootStateType, unknown, AppActionsType>

// типизация санок
// export  type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, AnyAction>
export  type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, AppActionsType>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
