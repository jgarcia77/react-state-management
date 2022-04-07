import React from 'react';
import { useRef } from 'react';
import { Renders } from './Renders';

const Title = ({ text, subText }) => {
    const renders = useRef(0);

    return (
        <>
            <Renders name="Title" value={renders.current++} />
            <div className="headings">
                <h1>{text}</h1>
                <h2>{subText}</h2>
            </div>
            
        </>
    );
};

const TitleMemoized = React.memo(Title);
const TitleExport = process.env.REACT_APP_OPTIMIZE === 'false' ? Title : TitleMemoized;
export { TitleExport as Title };