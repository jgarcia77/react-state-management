import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postCommentThunk } from '../../state/commentingSlice';

export const AddComment = () => {
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');

    const handleAdd = () => {
        dispatch(postCommentThunk(comment));
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