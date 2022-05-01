import { useState } from 'react';
import { useGlobalStateContext } from '../../state/GlobalState';

export const AddComment = () => {
    const { handleCommentAdd } = useGlobalStateContext();
    const [comment, setComment] = useState('');

    const handleAdd = () => {
        handleCommentAdd(comment);
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