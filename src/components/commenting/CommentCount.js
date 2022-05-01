import React, { useRef } from 'react';
import { Renders } from '../common/Renders';
import { useGlobalStateContext } from '../../state/GlobalState';

const CommentCount = () => {
    const { comments } = useGlobalStateContext();

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