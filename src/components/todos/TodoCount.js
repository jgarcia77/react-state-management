import React, { useRef } from 'react';
import { observer } from "mobx-react-lite"
import { Renders } from '../common/Renders';
import { todosStore } from '../../state/GlobalState';

const TodoCount = observer(() => {
    const renders = useRef(0);
    return (
        <div className="dashed-wrapper domain-container todo-count">
            <Renders name="TodoCount" value={renders.current++} />
            <div>Total todo's: {todosStore.count}</div>
        </div>
    );
});

const TodoCountMemoized = React.memo(TodoCount);
const TodoCountExport = process.env.REACT_APP_OPTIMIZE === 'false' ? TodoCount : TodoCountMemoized;
export { TodoCountExport as TodoCount };