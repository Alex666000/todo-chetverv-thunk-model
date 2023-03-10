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
//             // ???????????? ???????????? ??????????:
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
//         // ???????????????????? ?????????????????? ?? ?????????????? ?????????????????? - ?????????????????????? ???? ???????? ???????????????????? ?????? ?? ?????? ?????????????????? ?? ?????? ???????? ?????????????????? ???????????????? []
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
// // thunks - thunksCreator ????????????????????  ??????????????-??????????
// export const fetchTasksTc = (todolistId: string) => (dispatch: Dispatch) => {
//     todolistsAPI.getTasks(todolistId)
//         .then((res) => {
//             // ?????????? ?????????? ?? res.data.items
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
// // ???????????????? ????????????
// export const addTaskTC: any = ({title, todolistId}: { title: string, todolistId: string }) => (dispatch: Dispatch) => {
//     todolistsAPI.createTask({title, todolistId})
//         .then((res) => {
//             // console.log(res)
//             // ???????????????? ?????????????????? ?? ?????? ?????????? ??????????
//             // ?????? ?????????????????? ?????????????????? res.data.data.item
//             dispatch(addTaskAC(res.data.data.item))
//         })
// }
// // ***************************************************************************************************************
// // ???????????? ?????? ???????????????????? ???????????? - put ?????????? ????????????????????....
// // 2 ---
// export const changeTaskStatusTC: any = (taskId: string, newStatus: TaskStatuses, todolistId: string) =>
//     (dispatch: Dispatch, getState: () => AppRootStateType) => {
//         const state = getState()
//         // ???????????????? ?????????? ?????????????????????? ???????? ?? ???????? ?? ?????? ???????????????????? ?????????? - ?????? ???????????????? ?????????? ?? ?? ?????? ?????????? ?????????????????????? ???? ?????? ????????
//         const task = state.tasks[todolistId].find(task => task.id === taskId)
//         // find ?????????? ?????????? ?? ???? ??????????
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
//         // ?????????? ???????????? ????????????????:
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
//         // ???? ???? ?????? ??????????????:
//         if (!task) {
//             // ???????? ?????????? ???? ?????????????? - ???? ???????????????????????? ??????????????????
//             // throw new Error('task not found in the state')
//             console.warn("task not found in the state")
//             // ??????????????...???????????? ???? ???????????? ???????? ?????????? ??????
//             return
//         }
//         const model: UpdateTaskModelType = {
//             title: task.title,
//             // ???????????? ?????????? ?????? ?????????????? ???????????????? ????????
//             // ?????????? ???????????? ???????????????? ?????? ???????????????????????????? ???????????????????? status ???? newStatus
//             status: newStatus,
//             startDate: task.startDate,
//             deadline: task.deadline,
//             description: task.description,
//             priority: task.priority,
//         }
//         // ?????????? ???????? ?????????? ???????????????????? ?? updateTask
//
//         /* ???????? ???????????????? ???????????????? ?????? ???? ???????????? ???? ???????????????? ?? ?????? ?????????????????? ???????????????? ???? ?????????????? ???????????? ???? ?????????????? ?????? ?????? ????????????????
//         ???????? ???????????? ???? ???????????????????? ?? ?????????????? ????????????????????
//         ?????? ???????????????? ?????????? ???? ?????????? ???????????? ?????????????????? ???????????? ?????????? ?????? ???????? ?? ???? ?????? ?????????? ??.?? status ????????????????????????
//         ?????? ?????????? ?????????? ?????? ?????????? ?????????? ???????????????? ?????????????? ?????????????????? ???????????? - ???????????????? ???? ???? state */
//
//         todolistsAPI.updateTask(todolistId, taskId, model)
//             .then((res) => {
//                 // res - ???????????? ?????????????????? ???????????? - ???????????? ?????? ??????????????????????????
//                 // ?????????? ???????????? ???????????????? ?????? ???????????????????????????? ???????????????????? status ???? newStatus
//                 dispatch(changeTaskStatusAC(taskId, newStatus, todolistId)
//                 )
//             })
//     }
// // ?????? ???????????? - ???????????? ???????????? ?????????????? ???????????????? ?? ?????????????????? ?????? ???????????????? ???????? ???????????? ?? Headers ??????????????...
// // 2 ???????????? - ????????????????????????: ?????? ?????? ???? ???????????? ???????????????? ???????????? ???????????????? - ?????????????????? - ???? ???????????????? ?????? ??????????
//
// /* const model: UpdateTaskModelType = {
//     ...task,
//     status
// } */
//
// // ???????????? ???????? ?????????? ?????? ???????????????????? title ?????????????? - ?????? ?????????????????????????? ?????????? ?????????????? ???????????? ????????????
// // ???????????? ???????????? title status ?????????????????? model...
// // changeTaskStatusTC ?????????????????????? ?? updateTaskTC - ???????????? ???????????? ?? task-reducer...
//
//
//
//
//
