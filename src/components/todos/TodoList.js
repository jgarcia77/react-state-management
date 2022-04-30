import { useEffect, useRef } from 'react';
import { observer } from "mobx-react-lite"
import { Renders } from '../common/Renders';
import { todosStore } from '../../state/GlobalState';

export const TodoList = observer(() => {
    const renders = useRef(0);
    const renderItems = todosStore.count !== 0;

    const handleDelete = (event, id) => {
        event.preventDefault();
        todosStore.removeTodo(id);
    }

    useEffect(() => {
        todosStore.loadTodos();
    }, []);

    return (
        <div className="domain-list todo-list">
            <Renders name="TodoList" value={renders.current++} />
            {!renderItems && <div className="domain-list-empty">
                Todo list is empty
            </div>}
            {renderItems && <ul className="domain-ul">
                {todosStore.todos.map(({ id, value }) => <li key={id} className="domain-list-item">{value} <a href="" onClick={(e) => handleDelete(e, id)}>remove</a></li>)}
            </ul>}
        </div>
        
    );
});