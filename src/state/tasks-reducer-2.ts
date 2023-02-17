import {TasksStateType} from "../App";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api"
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: "ADD-TASK",
    task: TaskType
}

export type UpdateTaskActionType = {
    type: "UPDATE-TASK",
    todolistId: string
    taskId: string
    model: UpdateDomainTaskModelType
}

export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE",
    todolistId: string
    taskId: string
    title: string
}
export type SetTasksActionType = {
    type: "SET-TASKS"
    tasks: TaskType[]
    todolistId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | UpdateTaskActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

const initialState: TasksStateType = {}
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
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
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
            const newTask = action.task
            let tasks = stateCopy[newTask.todoListId];
            const newTasks = [newTask, ...tasks];
            tasks = newTasks;
            return stateCopy;
        }
        case "UPDATE-TASK": {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, ...action.model} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
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
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: "ADD-TASK", task}
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): UpdateTaskActionType => {
    return {type: "UPDATE-TASK", model, todolistId, taskId}
}
export const setTaksAC = (tasks: TaskType[], todolistId: string): SetTasksActionType => {
    return {type: "SET-TASKS", tasks, todolistId}
}

// thunks - thunksCreator возвращает  функцию-санку
export const fetchTasksTc = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            // таски сидят в res.data.items
            const {items} = res.data
            dispatch(setTaksAC(items, todolistId))
        })
}
export const deleteTaskTC: any = (p: { taskId: string, todolistId: string }) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(p.todolistId, p.taskId)
            .then((res) => {
                dispatch(removeTaskAC(p.taskId, p.todolistId))
            })
    }
}
// принмаем объект
export const addTaskTC: any = ({title, todolistId}: { title: string, todolistId: string }) => (dispatch: Dispatch) => {
    todolistsAPI.createTask({title, todolistId})
        .then((res) => {
            // console.log(res)
            // консолем проверяем в чем сидит таска
            // для сущностей диспатчим res.data.data.item
            dispatch(addTaskAC(res.data.data.item))
        })
}
// ***************************************************************************************************************
// Логика при обновлении данных - put когда используем....
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC: any = (taskid: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(task => task.id === taskid)

        if (!task) {
            console.warn("task not found in the state")
            return
        }
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            status: task.status,
            startDate: task.startDate,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
        }

        todolistsAPI.updateTask(todolistId, taskid, apiModel)
            .then((res) => {
                dispatch(updateTaskAC(taskid, domainModel, todolistId))
            })
    }

// Теперь надо также для обновления title сделать - код дублироваться будет поэтому делаем вместо
// changeTaskStatusTC переименуем в updateTaskTC - логику смотри в task-reducer...





