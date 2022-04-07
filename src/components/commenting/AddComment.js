import { useState } from 'react';

export const AddComment = ({ onAdd = () => {} }) => {
    const [comment, setComment] = useState('');

    const handleAdd = () => {
        onAdd(comment);
        setComment('');
    }

    return (
        <div className="add-comment">
            <div>
                <input type="text" onChange={(e) => setComment(e.target.value)} value={comment} />
                <button onClick={handleAdd}>Add Comment</button>
            </div>
        </div>
        
    );
}