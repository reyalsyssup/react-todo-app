import React from "react";

export default function Todo({ todo, toggleTodo }) {
    function handleCheckboxClick() {
        toggleTodo(todo.id);
    }
    return (
        <div className="todo" onClick={handleCheckboxClick}>
            <input type="checkbox" checked={todo.completed} readOnly={true} />
            <span>{todo.name}</span>
        </div>
    )
}