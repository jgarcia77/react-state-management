import React, { useRef } from 'react';
import { Renders } from '../common/Renders';

const TodoCount = ({ value }) => {
    const renders = useRef(0);
    return (
        <div className="dashed-wrapper domain-container todo-count">
            <Renders name="TodoCount" value={renders.current++} />
            <div>Total todo's: {value}</div>
        </div>
    );
};

const TodoCountMemoized = React.memo(TodoCount);
const TodoCountExport = process.env.REACT_APP_OPTIMIZE === 'false' ? TodoCount : TodoCountMemoized;
export { TodoCountExport as TodoCount };