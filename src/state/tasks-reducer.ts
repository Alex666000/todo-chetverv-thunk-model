import {TasksStateType} from "../App";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api"
import {Dispatch} from "redux";
import {AppThunk, RootStateType} from "./store";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: "ADD-TASK"
    task: TaskType
}

// export type ChangeTaskStatusActionType = {
//     type: "UPDATE-TASK",
//     todolistId: string
//     taskId: string
//     status: TaskStatuses
// }
export type UpdateTaskActionType = {
    type: "UPDATE-TASK",
    model: UpdateDomainTaskModelType
    todolistId: string
    taskId: string
}

// export type ChangeTaskTitleActionType = {
//     type: "CHANGE-TASK-TITLE",
//     todolistId: string
//     taskId: string
//     title: string
// }
export type SetTasksActionType = {
    type: "SET-TASKS"
    tasks: TaskType[]
    todolistId: string
}
// название полностью а не просто ActionsType
export type TasksActionsType = RemoveTaskActionType | AddTaskActionType
    | UpdateTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

const initialState: TasksStateType = {
    // state пустым оставлять нельзя иначе  undefined будет
    "todolistId1": [],
    "todolistId2": [],
    "todolistId3": [],
}
/*"todolistId1": [
    { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
    { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
    { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
],
"todolistId2": [
    { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
    { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
    { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
]*/


// reducer
export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            // таска что пришла с сервера...
            const newTask = action.task;
            // достаем все таски для данного тудулиста
            let tasks = stateCopy[newTask.todoListId]
            // делаем копию всех тасок и вначало добавляем новую таску
            // получился новый массив тасок
            const newTasks = [action.task, ...tasks];
            // перезапишем этот массив
            stateCopy[action.task.todoListId] = newTasks
            return stateCopy;
        }
        // case "UPDATE-TASK": {
        //     let todolistTasks = state[action.todolistId];
        //     let newTasksArray = todolistTasks
        //         .map(t => t.id === action.taskId ? {...t, status: action.status} : t);
        //
        //     state[action.todolistId] = newTasksArray;
        //     return ({...state});
        // }
// *******************************************************************************************************
        case "UPDATE-TASK": {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                // раскукоживаем теперь модельку а не статус в которой какие-то сойства надо заменить
                .map(t => t.id === action.taskId ? {...t, ...action.model} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
// *******************************************************************************************************
        // case "CHANGE-TASK-TITLE": {
        //     let todolistTasks = state[action.todolistId];
        //     // найдём нужную таску:
        //     let newTasksArray = todolistTasks
        //         .map(t => t.id === action.taskId ? {...t, title: action.title} : t);
        //
        //     state[action.todolistId] = newTasksArray;
        //     return ({...state});
        // }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case "REMOVE-TODOLIST": {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        // установили тудулисты с пустыми массивами - пробежались по всем тудулистам что к нам прилетели и для всех установим свойства []
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => stateCopy[tl.id] = [])
            return stateCopy
        }
        case "SET-TASKS": {
            const copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }

        default:
            return state;
    }
}
// actions
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskId: taskId, todolistId: todolistId}
}
// передаем сущность - например todolistId и title не передаем так как эти свойства генерируются внутри объекта task на сервере

export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: "ADD-TASK", task}
}
// export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
//     return {type: "UPDATE-TASK", status, todolistId, taskId}
// }
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): UpdateTaskActionType => {
    return {type: "UPDATE-TASK", taskId, model, todolistId}
}
// export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
//     return {type: "CHANGE-TASK-TITLE", title, todolistId, taskId}
// }
export const setTaksAC = (tasks: TaskType[], todolistId: string): SetTasksActionType => {
    return {type: "SET-TASKS", tasks, todolistId}
}

// thunks - thunksCreator возвращает  функцию-санку

// КАК ПИСАТЬ С THEN - ОБРАЗЕЦ

// export const _fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
//     todolistsAPI.getTasks(todolistId)
//         .then((res) => {
//             // таски сидят в res.data.items
//             const {items} = res.data
//             dispatch(setTaksAC(items, todolistId))
//         })
// }

export const fetchTasksTC = (todolistId: string): AppThunk => async (dispatch) => {
    const res = await todolistsAPI.getTasks(todolistId)
    // таски сидят в res.data.items
    const {items} = res.data
    dispatch(setTaksAC(items, todolistId))
}

export const deleteTaskTC = (p: { taskId: string, todolistId: string }): AppThunk => async (dispatch) => {
    const res = await todolistsAPI.deleteTask(p.todolistId, p.taskId)
    dispatch(removeTaskAC(p.taskId, p.todolistId))
}
// принмаем объект
export const addTaskTC = (data: { title: string, todolistId: string }): AppThunk => (dispatch) => {
    // ожидает апишка createTask объект - и я передаю весь объект
    todolistsAPI.createTask(data)
        .then((res) => {
            const tasks = res.data.data.item
            console.log(tasks)
            // консолем проверяем в чем сидит таска
            // для сущностей диспатчим res.data.data.item
            const newTask = res.data.data.item
            dispatch(addTaskAC(newTask))
        })
}
// делаем общую санку так как код дублируется при изменении put
/*  export const changeTaskStatusTC: any = (taskId: string, status: TaskStatuses, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        // получаем таски конкретного туду и ищем в них конкретную таску - нам вернется таска и у нее можем скопировать то что надо
        const task = state.tasks[todolistId].find(task => task.id === taskId)
        // find может таску и не найти

        /!* const model: UpdateTaskModelType = {
             title: "",
             status: TaskStatuses.InProgress,
             startDate: "",
             deadline: "",
             description: "",
             priority: TaskPriorities.Hi,
         }*!/

        // можно просто написать:
       /!* if (task) {
            const model: UpdateTaskModelType = {
                title: "",
                status: TaskStatuses.InProgress,
                startDate: "",
                deadline: task.deadline,
                description: "",
                priority: TaskPriorities.Hi,
            }
        }*!/

        // но мы так сделаем:
        if (!task) {
            // если таска не найдена - то пользователя оповестим
            // throw new Error('task not found in the state')
            console.warn('task not found in the state')
            // оборвем...дальше не пойдем если таски нет
            return
        }
        const model: UpdateTaskModelType = {
            title: task.title,
            // статус берем тот который приходит сюда
            status: status,
            startDate: task.startDate,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
        }
        // после чего таску закидываем в updateTask

        /!* если модельку отправим так то статус то поменяем а все остальные свойства на серваке затрем на пустоту так как передаем
        весь объект со свойствами с пустыми значениями
        все свойства какие не хотим менять оставляем такими какие они были а то что нужно т.е status перезатереть
        для этого нужно тут иметь таску исходную которую собираюсь менять - достанем ее из state *!/

        todolistsAPI.updateTask(todolistId, taskId, model)
            .then((res) => {
                // res - значит результат пришел - сервер дал подтверждение
                dispatch(changeTaskStatusAC(taskId,status,todolistId)
            )
            })
    }  */


// все готово - меняем статус галочки чекбокса и проверяем что отправим весь объект в Headers смотрим...
// 2 способ - неправильный: так как на сервер отправим лишние свойства - избыточно - но работать все будет

/* const model: UpdateTaskModelType = {
    ...task, status
} */
//************************************************************************************************************
// в будущем можем сделать логику по обновлению любого параметра в том числе например description
// скопируем тип с api -  переименуем UpdateTaskModelType на UpdateDomainTaskModelType - тип с апи не трогаем его - не меняем
// так как он является характеристикой того как мы взаимодействуем с сервером - а Вы уже делаете свои типы в др файлах на основе моео идеал
// свойства тут по желанию передаем ?

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

// вместо status теперь принимаем model (так как любое свойство можем поменять а не одно как раньше...)
// с таким типом - заменяем эту строку:
// export const updateTaskStatusTC: any = (taskId: string, status: TaskStatuses, todolistId: string) =>
// на такую строку export const updateTaskStatusTC: any = (taskId: string, model, todolistId: string) =>

// переименуем с model на domainModel
export const updateTaskTC: any = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => RootStateType) => {
        const state = getState()
        // получаем таски конкретного туду и ищем в них конкретную таску - нам вернется таска и у нее можем скопировать то что надо
        const task = state.tasks[todolistId].find(task => task.id === taskId)
        // find может таску и не найти

        /* const model: UpdateTaskModelType = {
             title: "",
             status: TaskStatuses.InProgress,
             startDate: "",
             deadline: "",
             description: "",
             priority: TaskPriorities.Hi,
         }*/

        // можно просто написать:
        /* if (task) {
             const model: UpdateTaskModelType = {
                 title: "",
                 status: TaskStatuses.InProgress,
                 startDate: "",
                 deadline: task.deadline,
                 description: "",
                 priority: TaskPriorities.Hi,
             }
         }*/

        // но мы так сделаем:
        if (!task) {
            // если таска не найдена - то пользователя оповестим
            // throw new Error('task not found in the state')
            console.warn("task not found in the state")
            // оборвем...дальше не пойдем если таски нет
            return
        }
        // переименуем с model на apiModel -эту модель на сервер отправлять будет
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            // статус берем тот который приходит сюда
            status: task.status,
            startDate: task.startDate,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            // заберем все у apiModel которая нам пришла из UI - и перезатрем одно свойство а остальные деыфолтные что достали
            // getState-ом отправим
        }
        // после чего таску закидываем в updateTask

        /* если модельку отправим так то статус то поменяем а все остальные свойства на серваке затрем на пустоту так как передаем
        весь объект со свойствами с пустыми значениями
        все свойства какие не хотим менять оставляем такими какие они были а то что нужно т.е status перезатереть
        для этого нужно тут иметь таску исходную которую собираюсь менять - достанем ее из state */

// сюда вместо model передадим теперь apiModel
        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                // res - значит результат пришел - сервер дал подтверждение
                dispatch(updateTaskAC(taskId, domainModel, todolistId)
                )
            })
    }
// теперь АС переименуем по примеру updateTaskTC - так как АС у нас разные которые меняют status title...делаем один общий АС














