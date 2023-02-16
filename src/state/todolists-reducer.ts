import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/todolists-api"
import {AnyAction, Dispatch} from "redux";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    todolist: TodolistType
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    id: string
    filter: FilterValuesType
}
export type SetTodolistsActionType = {
    type: "SET-TODOLISTS",
    todolists: TodolistType[]
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

// initialState
const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]
// FilterValuesType
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
// reducer
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id)
        }
        case "ADD-TODOLIST": {
            // тудуличт что пришел с сервака к нему дописываем юайный фильтр
            const newTodolist: TodolistDomainType = {...action.todolist, filter: "all"}
            return [newTodolist, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER": {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case "SET-TODOLISTS": {
            // у нас с сервака пришли тудулисты без фильтра - довавим его
            // не забываем когда добавили тудулисты надо в таск редюсере создать ячейки для
            // хранения тасок будущих - пустые массивы должны быть добавлены когда сетаем тудулисты
            return action.todolists.map(tl => {
                return {...tl, filter: "all"}
            })
        }
        default:
            return state;
    }
}
// actions
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistId}
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", todolist}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter}
}
// как будто получили мы тудулисты предположим и отправим их в state
export const setTodolistsAC = (todolists: TodolistType[]): SetTodolistsActionType => {
    return {type: "SET-TODOLISTS", todolists}
}
//------------------------------------------------------------------------------------
// thunks - thunksCreator возвращает  функцию-санку - нужен чтобы санка
export const fetchTodolistsTC: any = () => {
    // санка(совокупность множества диспатчей) принмает 2 параметра dispatch(чтобы изменять state)
    // getState (чтобы доставать из state)
// санка использует параметры из ТС
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}
export const removeTodolistsTC: any = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then((res) => {
            // ответ пришел значит на сервере тудулист удалился
            dispatch(removeTodolistAC(todolistId))
        })
}
export const addTodolistsTC: any = (title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title)
        .then((res) => {
            // для сущностей диспатчим res.data.data.item
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const changeTodolistTitleTC: any = (id: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(id, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(id,title))
        })
}

