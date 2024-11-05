import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
	reducer,
	middleware(getDefaultMiddleware) {
		return getDefaultMiddleware({
			serializableCheck: false,
		});
	},
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
	ReturnType<typeof store.getState>
> = useSelector;

export default store;
