import React from 'react';
import { observer } from "mobx-react-lite"
import { ErrorMessage } from './ErrorMessage';
import { InfoMessage } from './InfoMessage'
import { commentingStore } from '../../state/GlobalState';

const MessageBanner = observer(({ todosError }) => {
    return (
        <div className="message-banner">
            {!commentingStore.hasError && <InfoMessage message="Please enter a comment" className="info-message__commenting" />}
            {commentingStore.hasError && <ErrorMessage message={commentingStore.commentsError} />}

            {!todosError && <InfoMessage message="Please enter a todo" className="info-message__todos" />}
            {todosError && <ErrorMessage message={todosError} />}
        </div>
    );
});

const MessageBannerMemoized = React.memo(MessageBanner);
const MessageBannerExport = process.env.REACT_APP_OPTIMIZE === 'false' ? MessageBanner : MessageBannerMemoized;
export { MessageBannerExport as MessageBanner };