import React, {useState, useRef, useEffect} from "react";
import uuidv4 from "uuid/dist/v4";
import TodoList from "./TodoList";

const LOCAL_STORAGE_KEY = "TodoApp.todos";

export default function App() {
    const [todos, setTodos] = useState([]);
    const todoNameRef = useRef();

    function addTodo() {
        const todoName = todoNameRef.current.value;
        if (todoName === "") return;
        setTodos(prevTodos => {
            return [...prevTodos, {name: todoName, id: uuidv4(), completed: false}]
        })
        todoNameRef.current.value = null;
    }

    function clearComplete() {
        const newTodos = todos.filter(todo => !todo.completed);
        setTodos(newTodos)
    }

    function toggleTodo(id) {
        const newTodos = [...todos];
        const todo = newTodos.find(todo => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos)
    }

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if(storedTodos) setTodos(storedTodos)
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos]);

    return (
        <div className="todo-list-container">
            <input type="text" ref={todoNameRef} />

            <div className="todo-list">
                <p className="left-to-do">{todos.filter(todo => !todo.completed).length} left to do</p>
                <TodoList todos={todos} toggleTodo={toggleTodo} />
            </div>
            <button onClick={addTodo}>Add Todo</button>
            <button onClick={clearComplete} className="clear-todo-btn">Clear Complete</button>
        </div>
    )
}