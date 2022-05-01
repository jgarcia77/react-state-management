import { useState } from 'react';
import { useGlobalStateContext } from '../../state/GlobalState';

export const AddTodo = () => {
    const { handleTodoAdd } = useGlobalStateContext();
    const [todo, setTodo] = useState('');

    const handleAdd = () => {
        handleTodoAdd(todo);
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