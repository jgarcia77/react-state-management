import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos, getTodosThunk, deleteTodoThunk } from '../../state/todosSlice';
import { Renders } from '../common/Renders';

export const TodoList = () => {
    const todos = useSelector(selectTodos);
    const dispatch = useDispatch();
    const renders = useRef(0);
    const renderItems = todos.length !== 0;

    const handleDelete = (event, id) => {
        event.preventDefault();
        dispatch(deleteTodoThunk(id));
    }

    useEffect(() => {
        dispatch(getTodosThunk());
    }, []);

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