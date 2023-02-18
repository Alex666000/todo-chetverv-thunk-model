import {todolistsAPI, TodolistType} from "../api/todolists-api"
import {Dispatch} from "redux";
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
export const removeTodolistAC = (todolistId: string) => {
    return {type: "REMOVE-TODOLIST", id: todolistId} as const
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: "ADD-TODOLIST", todolist} as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter} as const
}
// как будто получили мы тудулисты предположим и отправим их в state
export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {type: "SET-TODOLISTS", todolists} as const
}
//------------------------------------------------------------------------------------
// thunks - thunksCreator возвращает  функцию-санку - нужен чтобы санка
//*********************************************************************************************
export const fetchTodolistsTC = () => async (dispatch: Dispatch) => {
    const res = await todolistsAPI.getTodolists()
    dispatch(setTodolistsAC(res.data))
}

// КАК ПИСАТЬ С THEN - ОБРАЗЕЦ

// export const _fetchTodolistsTC = () => {
//     // санка(совокупность множества диспатчей) принмает 2 параметра dispatch(чтобы изменять state)
//     // getState (чтобы доставать из state)
// // санка использует параметры из ТС
//     return (dispatch: Dispatch) => {
//         todolistsAPI.getTodolists()
//             .then((res) => {
//                 dispatch(setTodolistsAC(res.data))
//             })
//     }
// }
//*********************************************************************************************
export const removeTodolistsTC = (todolistId: string) => async (dispatch: Dispatch) => {
    const res = await todolistsAPI.deleteTodolist(todolistId)
    dispatch(removeTodolistAC(todolistId))
}

export const addTodolistsTC: any = (title: string) => async (dispatch: Dispatch) => {
    const res = await todolistsAPI.createTodolist(title)
    // для сущностей диспатчим res.data.data.item
    dispatch(addTodolistAC(res.data.data.item))
}

export const changeTodolistTitleTC = (id: string, title: string) => async (dispatch: Dispatch) => {
    const res = await todolistsAPI.updateTodolist(id, title)
    dispatch(changeTodolistTitleAC(id, title))
}
// types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
//ActionsType
type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType | SetTodolistsActionType
