import React from 'react';
import { AddTodo } from './AddTodo';
import { TodoList } from './TodoList';

const Todo = () => {
    return (
        <div className="dashed-wrapper domain-container content__todos">
            <AddTodo />
            <TodoList />
        </div>
    );
};

const TodoMemoized = React.memo(Todo);
const TodoExport = process.env.REACT_APP_OPTIMIZE === 'false' ? Todo : TodoMemoized;
export { TodoExport as Todo };