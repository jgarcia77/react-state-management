import { useRef } from 'react';
import { Renders } from '../common/Renders';
import { useGlobalStateContext } from '../../state/GlobalState';

export const CommentList = () => {
    const { comments, handleCommentDelete } = useGlobalStateContext();
    const renders = useRef(0);
    const renderItems = comments.length !== 0;

    const handleDelete = (event, id) => {
        event.preventDefault();
        handleCommentDelete(id);
    }

    return (
        <div className="domain-list comment-list">
            <Renders name="CommentList" value={renders.current++} />
            {!renderItems && <div className="domain-list-empty">
                Comment list is empty
            </div>}
            {renderItems && <ul className="domain-ul">
                {comments.map(({ id, value }) => <li key={id}>{value} <a href="" onClick={(e) => handleDelete(e, id)}>remove</a></li>)}
            </ul>}
        </div>
        
    );
}