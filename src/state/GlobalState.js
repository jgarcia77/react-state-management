import constate from "constate";
import { useGlobalState } from './useGlobalState';

const [GlobalStateProvider, useGlobalStateContext] = constate(useGlobalState);

export { GlobalStateProvider, useGlobalStateContext };