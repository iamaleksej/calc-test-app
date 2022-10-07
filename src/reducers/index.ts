import { combineReducers } from "redux";
import { vacanciesReducer } from "./vacanciesReducer";
import { vacancyReducer } from "./vacancyReducer";

export const rootReducer = combineReducers({

	vacanciesData: vacanciesReducer,
	vacancyData: vacancyReducer
})

export type RootState = ReturnType<typeof rootReducer>