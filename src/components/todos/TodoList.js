import { useRef } from 'react';
import { Renders } from '../common/Renders';
import { useGlobalStateContext } from '../../state/GlobalState';

export const TodoList = () => {
    const { todos, handleTodoDelete } = useGlobalStateContext();
    const renders = useRef(0);
    const renderItems = todos.length !== 0;

    const handleDelete = (event, id) => {
        event.preventDefault();
        handleTodoDelete(id);
    }

    return (
        <div className="domain-list todo-list">
            <Renders name="TodoList" value={renders.current++} />
            {!renderItems && <div className="domain-list-empty">
                Todo list is empty
            </div>}
            {renderItems && <ul className="domain-ul">
                {todos.map(({ id, value }) => <li key={id} className="domain-list-item">{value} <a href="" onClick={(e) => handleDelete(e, id)}>remove</a></li>)}
            </ul>}
        </div>
        
    );
}