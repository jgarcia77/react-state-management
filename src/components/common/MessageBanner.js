import React from 'react';
import { observer } from "mobx-react-lite"
import { ErrorMessage } from './ErrorMessage';
import { InfoMessage } from './InfoMessage'
import { commentingStore } from '../../state/GlobalState';
import { todosStore } from '../../state/GlobalState';

const MessageBanner = observer(() => {
    return (
        <div className="message-banner">
            {!commentingStore.hasError && <InfoMessage message="Please enter a comment" className="info-message__commenting" />}
            {commentingStore.hasError && <ErrorMessage message={commentingStore.commentsError} />}

            {!todosStore.hasError && <InfoMessage message="Please enter a todo" className="info-message__todos" />}
            {todosStore.hasError && <ErrorMessage message={todosStore.todosError} />}
        </div>
    );
});

const MessageBannerMemoized = React.memo(MessageBanner);
const MessageBannerExport = process.env.REACT_APP_OPTIMIZE === 'false' ? MessageBanner : MessageBannerMemoized;
export { MessageBannerExport as MessageBanner };