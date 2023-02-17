 import {TasksStateType} from "../App";
// import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
// import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api"
// import {Dispatch} from "redux";
// import {AppRootStateType} from "./store";
//
// export type RemoveTaskActionType = {
//     type: "REMOVE-TASK",
//     todolistId: string
//     taskId: string
// }
//
// export type AddTaskActionType = {
//     type: "ADD-TASK",
//     task: TaskType
// }
//
// export type ChangeTaskStatusActionType = {
//     type: "UPDATE-TASK",
//     todolistId: string
//     taskId: string
//     status: TaskStatuses
// }
//
// export type ChangeTaskTitleActionType = {
//     type: "CHANGE-TASK-TITLE",
//     todolistId: string
//     taskId: string
//     title: string
// }
// export type SetTasksActionType = {
//     type: "SET-TASKS"
//     tasks: TaskType[]
//     todolistId: string
// }
//
// type ActionsType = RemoveTaskActionType | AddTaskActionType
//     | ChangeTaskStatusActionType
//     | ChangeTaskTitleActionType
//     | AddTodolistActionType
//     | RemoveTodolistActionType
//     | SetTodolistsActionType
//     | SetTasksActionType
//
// const initialState: TasksStateType = {}
// /*"todolistId1": [
//     { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
//         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
//     { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
//         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
//     { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
//         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
// ],
// "todolistId2": [
//     { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
//         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
//     { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
//         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
//     { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
//         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
// ]*/
//
//
// // reducer
// export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
//     switch (action.type) {
//         case "REMOVE-TASK": {
//             const stateCopy = {...state}
//             const tasks = stateCopy[action.todolistId];
//             const newTasks = tasks.filter(t => t.id !== action.taskId);
//             stateCopy[action.todolistId] = newTasks;
//             return stateCopy;
//         }
//         case "ADD-TASK": {
//             const stateCopy = {...state}
//             const newTask = action.task
//             let tasks = stateCopy[newTask.todoListId];
//             const newTasks = [newTask, ...tasks];
//             tasks = newTasks;
//             return stateCopy;
//         }
//         case "UPDATE-TASK": {
//             let todolistTasks = state[action.todolistId];
//             let newTasksArray = todolistTasks
//                 .map(t => t.id === action.taskId ? {...t, status: action.status} : t);
//
//             state[action.todolistId] = newTasksArray;
//             return ({...state});
//         }
//         case "CHANGE-TASK-TITLE": {
//             let todolistTasks = state[action.todolistId];
//             // найдём нужную таску:
//             let newTasksArray = todolistTasks
//                 .map(t => t.id === action.taskId ? {...t, title: action.title} : t);
//
//             state[action.todolistId] = newTasksArray;
//             return ({...state});
//         }
//         case "ADD-TODOLIST": {
//             return {
//                 ...state,
//                 [action.todolist.id]: []
//             }
//         }
//         case "REMOVE-TODOLIST": {
//             const copyState = {...state};
//             delete copyState[action.id];
//             return copyState;
//         }
//         // установили тудулисты с пустыми массивами - пробежались по всем тудулистам что к нам прилетели и для всех установим свойства []
//         case "SET-TODOLISTS": {
//             const stateCopy = {...state}
//             action.todolists.forEach((tl) => stateCopy[tl.id] = [])
//             return stateCopy
//         }
//         case "SET-TASKS": {
//             const copyState = {...state}
//             copyState[action.todolistId] = action.tasks
//             return copyState
//         }
//
//         default:
//             return state;
//     }
// }
// // actions
// export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
//     return {type: "REMOVE-TASK", taskId: taskId, todolistId: todolistId}
// }
// export const addTaskAC = (task: TaskType): AddTaskActionType => {
//     return {type: "ADD-TASK", task}
// }
// export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
//     return {type: "UPDATE-TASK", status, todolistId, taskId}
// }
// export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
//     return {type: "CHANGE-TASK-TITLE", title, todolistId, taskId}
// }
// export const setTaksAC = (tasks: TaskType[], todolistId: string): SetTasksActionType => {
//     return {type: "SET-TASKS", tasks, todolistId}
// }
//
// // thunks - thunksCreator возвращает  функцию-санку
// export const fetchTasksTc = (todolistId: string) => (dispatch: Dispatch) => {
//     todolistsAPI.getTasks(todolistId)
//         .then((res) => {
//             // таски сидят в res.data.items
//             const {items} = res.data
//             dispatch(setTaksAC(items, todolistId))
//         })
// }
// export const deleteTaskTC: any = (p: { taskId: string, todolistId: string }) => {
//     return (dispatch: Dispatch) => {
//         todolistsAPI.deleteTask(p.todolistId, p.taskId)
//             .then((res) => {
//                 dispatch(removeTaskAC(p.taskId, p.todolistId))
//             })
//     }
// }
// // принмаем объект
// export const addTaskTC: any = ({title, todolistId}: { title: string, todolistId: string }) => (dispatch: Dispatch) => {
//     todolistsAPI.createTask({title, todolistId})
//         .then((res) => {
//             // console.log(res)
//             // консолем проверяем в чем сидит таска
//             // для сущностей диспатчим res.data.data.item
//             dispatch(addTaskAC(res.data.data.item))
//         })
// }
// // ***************************************************************************************************************
// // Логика при обновлении данных - put когда используем....
// // 2 ---
// export const changeTaskStatusTC: any = (taskId: string, newStatus: TaskStatuses, todolistId: string) =>
//     (dispatch: Dispatch, getState: () => AppRootStateType) => {
//         const state = getState()
//         // получаем таски конкретного туду и ищем в них конкретную таску - нам вернется таска и у нее можем скопировать то что надо
//         const task = state.tasks[todolistId].find(task => task.id === taskId)
//         // find может таску и не найти
//
//         /* 1 ---
//          const model: UpdateTaskModelType = {
//              title: "",
//              status: TaskStatuses.InProgress,
//              startDate: "",
//              deadline: "",
//              description: "",
//              priority: TaskPriorities.Hi,
//          }*/
//
//         // можно просто написать:
//         /* if (task) {
//              const model: UpdateTaskModelType = {
//                  title: "",
//                  status: TaskStatuses.InProgress,
//                  startDate: "",
//                  deadline: task.deadline,
//                  description: "",
//                  priority: TaskPriorities.Hi,
//              }
//          }*/
//
//         // но мы так сделаем:
//         if (!task) {
//             // если таска не найдена - то пользователя оповестим
//             // throw new Error('task not found in the state')
//             console.warn("task not found in the state")
//             // оборвем...дальше не пойдем если таски нет
//             return
//         }
//         const model: UpdateTaskModelType = {
//             title: task.title,
//             // статус берем тот который приходит сюда
//             // такая запись означает что переопределили переменную status на newStatus
//             status: newStatus,
//             startDate: task.startDate,
//             deadline: task.deadline,
//             description: task.description,
//             priority: task.priority,
//         }
//         // после чего таску закидываем в updateTask
//
//         /* если модельку отправим так то статус то поменяем а все остальные свойства на серваке затрем на пустоту так как передаем
//         весь объект со свойствами с пустыми значениями
//         все свойства какие не хотим менять оставляем такими какие они были а то что нужно т.е status перезатереть
//         для этого нужно тут иметь таску исходную которую собираюсь менять - достанем ее из state */
//
//         todolistsAPI.updateTask(todolistId, taskId, model)
//             .then((res) => {
//                 // res - значит результат пришел - сервер дал подтверждение
//                 // такая запись означает что переопределили переменную status на newStatus
//                 dispatch(changeTaskStatusAC(taskId, newStatus, todolistId)
//                 )
//             })
//     }
// // все готово - меняем статус галочки чекбокса и проверяем что отправим весь объект в Headers смотрим...
// // 2 способ - неправильный: так как на сервер отправим лишние свойства - избыточно - но работать все будет
//
// /* const model: UpdateTaskModelType = {
//     ...task,
//     status
// } */
//
// // Теперь надо также для обновления title сделать - код дублироваться будет поэтому делаем вместо
// // теперь вместо title status передадим model...
// // changeTaskStatusTC переименуем в updateTaskTC - логику смотри в task-reducer...
//
//
//
//
//
