import { VacancyAction, VacancyActionTypes, VacancyState } from "../components/types"

const initialState: VacancyState = {
	vacancy: {},
	loading: false,
	error: null
}

export const vacancyReducer = (state = initialState, action: VacancyAction): VacancyState => {
	// console.log(state.vacancy)

	switch (action.type) {
		case VacancyActionTypes.FETCH_VACANCY:
			return {
				vacancy: {},
				loading: true,
				error: null
			}
		case VacancyActionTypes.FETCH_VACANCY_SUCCESS:
			return {
				vacancy: action.payload,
				loading: false,
				error: null
			}
		case VacancyActionTypes.FETCH_VACANCY_ERROR:
			return {
				vacancy: {},
				loading: false,
				error: action.payload
			}
		default:
			return state;
	}

}
