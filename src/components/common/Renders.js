export const Renders = ({ name, value }) => {
    if (process.env.REACT_APP_ENABLE_RERENDERS === 'false') {
        return <></>;
    }

    return <div className="renders">({value} {name} {value === 1 ? 're-render' : 're-renders'})</div>;
};