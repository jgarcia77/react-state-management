import { useState } from 'react';

export const AddTodo = () => {
    const [todo, setTodo] = useState('');

    const handleAdd = () => {
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