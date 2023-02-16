import React, {useCallback, useEffect} from "react"
import "./App.css";
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC, addTodolistsTC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, changeTodolistTitleTC, fetchTodolistsTC,
    FilterValuesType,
    removeTodolistAC, removeTodolistsTC, setTodolistsAC,
    TodolistDomainType
} from "./state/todolists-reducer"
import {
    addTaskAC,
    addTaskTC,
    deleteTaskTC,
    removeTaskAC, updateTaskTC
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType, todolistsAPI} from "./api/todolists-api"
import {changeTaskStatusTC} from "./state/tasks-reducer-1";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

// когда компонента появилась - отрисовалась она может запрашивать еудулисты для себя
function App() {

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])


    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    const removeTask = useCallback(function (taskId: string, todolistId: string) {
        // передаем объект
        dispatch(deleteTaskTC({taskId, todolistId}))
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskTC({title, todolistId}))
    }, []);

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        // тут теперь отправляем модельку того что надо изменить
        dispatch(updateTaskTC(id, {status: status}, todolistId))
    }, []);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        // тут теперь отправляем модельку того что надо изменить
        dispatch(updateTaskTC(id, {title: newTitle}, todolistId))
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        dispatch(removeTodolistsTC(id));
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(changeTodolistTitleTC(id, title));
    }, []);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistsTC(title));
    }, [dispatch]);

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;