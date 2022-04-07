import React from 'react';
import { AddTodo } from './AddTodo';
import { TodoList } from './TodoList';

const Todo = ({ onAdd, onDelete, todos }) => {
    return (
        <div className="dashed-wrapper domain-container content__todos">
            <AddTodo onAdd={onAdd} />
            <TodoList 
                todos={todos}
                onDelete={onDelete} />
        </div>
    );
};

const TodoMemoized = React.memo(Todo);
const TodoExport = process.env.REACT_APP_OPTIMIZE === 'false' ? Todo : TodoMemoized;
export { TodoExport as Todo };