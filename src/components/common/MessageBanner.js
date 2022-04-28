import React from 'react';
import { useSelector } from 'react-redux';
import { selectCommentsError } from '../../state/commentingSlice';
import { selectTodosError } from '../../state/todosSlice';
import { ErrorMessage } from './ErrorMessage';
import { InfoMessage } from './InfoMessage'

const MessageBanner = () => {
    const commentsError = useSelector(selectCommentsError);
    const todosError = useSelector(selectTodosError);
    
    return (
        <div className="message-banner">
            {!commentsError && <InfoMessage message="Please enter a comment" className="info-message__commenting" />}
            {commentsError && <ErrorMessage message={commentsError} />}

            {!todosError && <InfoMessage message="Please enter a todo" className="info-message__todos" />}
            {todosError && <ErrorMessage message={todosError} />}
        </div>
    );
};

const MessageBannerMemoized = React.memo(MessageBanner);
const MessageBannerExport = process.env.REACT_APP_OPTIMIZE === 'false' ? MessageBanner : MessageBannerMemoized;
export { MessageBannerExport as MessageBanner };