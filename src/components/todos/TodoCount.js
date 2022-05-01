import React, { useRef } from 'react';
import { Renders } from '../common/Renders';
import { useGlobalStateContext } from '../../state/GlobalState';

const TodoCount = () => {
    const { todos } = useGlobalStateContext();
    const renders = useRef(0);
    return (
        <div className="dashed-wrapper domain-container todo-count">
            <Renders name="TodoCount" value={renders.current++} />
            <div>Total todo's: {todos.length}</div>
        </div>
    );
};

const TodoCountMemoized = React.memo(TodoCount);
const TodoCountExport = process.env.REACT_APP_OPTIMIZE === 'false' ? TodoCount : TodoCountMemoized;
export { TodoCountExport as TodoCount };