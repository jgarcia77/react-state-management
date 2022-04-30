import React, { useRef } from 'react';
import { observer } from "mobx-react-lite"
import { Renders } from '../common/Renders';
import { commentingStore } from '../../state/GlobalState';

const CommentCount = observer(() => {
    const renders = useRef(0);
    return (
        <div className="dashed-wrapper domain-container comment-count">
            <Renders name="CommentCount" value={renders.current++} />
            <div>Total comments: {commentingStore.count}</div>
        </div>
    );
});

const CommentCountMemoized = React.memo(CommentCount);
const CommentCountExport = process.env.REACT_APP_OPTIMIZE === 'false' ? CommentCount : CommentCountMemoized;
export { CommentCountExport as CommentCount };