import { useState } from 'react';
import { observer } from "mobx-react-lite"
import { commentingStore } from '../../state/GlobalState';

export const AddComment = observer(() => {
    const [comment, setComment] = useState('');

    const handleAdd = () => {
        commentingStore.addComment(comment);
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
});