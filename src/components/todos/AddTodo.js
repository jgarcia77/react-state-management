import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postTodoThunk } from '../../state/todosSlice';

export const AddTodo = () => {
    const dispatch = useDispatch();
    const [todo, setTodo] = useState('');

    const handleAdd = () => {
        dispatch(postTodoThunk(todo));
        setTodo('');
    }

    return (
        <div className="add-todo">
            <div>
                <input type="text" onChange={(e) => setTodo(e.target.value)} value={todo} />
                <button onClick={handleAdd}>Add Todo</button>
            </div>
        </div>
        
    );
}