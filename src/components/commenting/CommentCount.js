import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectComments } from '../../state/commentingSlice';
import { Renders } from '../common/Renders';

const CommentCount = () => {
    const comments = useSelector(selectComments);
    const renders = useRef(0);
    return (
        <div className="dashed-wrapper domain-container comment-count">
            <Renders name="CommentCount" value={renders.current++} />
            <div>Total comments: {comments.length}</div>
        </div>
    );
};

const CommentCountMemoized = React.memo(CommentCount);
const CommentCountExport = process.env.REACT_APP_OPTIMIZE === 'false' ? CommentCount : CommentCountMemoized;
export { CommentCountExport as CommentCount };