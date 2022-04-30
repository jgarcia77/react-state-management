import { useEffect, useRef } from 'react';
import { observer } from "mobx-react-lite"
import { Renders } from '../common/Renders';
import { commentingStore } from '../../state/GlobalState';

export const CommentList = observer(() => {
    const renders = useRef(0);
    const renderItems = commentingStore.count !== 0;

    const handleDelete = (event, id) => {
        event.preventDefault();
        commentingStore.removeComment(id);
    }

    useEffect(() => {
        commentingStore.loadComments();
    }, []);

    return (
        <div className="domain-list comment-list">
            <Renders name="CommentList" value={renders.current++} />
            {!renderItems && <div className="domain-list-empty">
                Comment list is empty
            </div>}
            {renderItems && <ul className="domain-ul">
                {commentingStore.comments.map(({ id, value }) => <li key={id}>{value} <a href="" onClick={(e) => handleDelete(e, id)}>remove</a></li>)}
            </ul>}
        </div>
        
    );
});