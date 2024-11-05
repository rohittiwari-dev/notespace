import { combineReducers } from "@reduxjs/toolkit";
import workspaceSlice from "./slices/workspace.slice";

const reducer = combineReducers({
	workspace: workspaceSlice.reducer,
});

export default reducer;
