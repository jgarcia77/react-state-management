import React from 'react';
import { AddComment } from './AddComment';
import { CommentList } from './CommentList';

const Commenting = () => {
    return (
        <div className="dashed-wrapper domain-container content__commenting">
            <AddComment />
            <CommentList />
        </div>
    );
};

const CommentingMemoized = React.memo(Commenting);
const CommentingExport = process.env.REACT_APP_OPTIMIZE === 'false' ? Commenting : CommentingMemoized;
export { CommentingExport as Commenting };