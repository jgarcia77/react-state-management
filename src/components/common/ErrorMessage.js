import React from 'react';

const ErrorMessage = ({ message }) => {
    return (
        <div className="error-message dashed-wrapper domain-container">
            {message}
        </div>
    );
};

const ErrorMessageMemoized = React.memo(ErrorMessage);
const ErrorMessageExport = process.env.REACT_APP_OPTIMIZE === 'false' ? ErrorMessage : ErrorMessageMemoized;
export { ErrorMessageExport as ErrorMessage };