import React from 'react';

const InfoMessage = ({ message, className }) => {
    return (
        <div className={`info-message ${className} dashed-wrapper domain-container`}>
            {message}
        </div>
    );
};

const InfoMessageMemoized = React.memo(InfoMessage);
const InfoMessageExport = process.env.REACT_APP_OPTIMIZE === 'false' ? InfoMessage : InfoMessageMemoized;
export { InfoMessageExport as InfoMessage };