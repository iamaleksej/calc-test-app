import { VacanciesActionTypes } from "../components/types";

const actionFilter = (filterName: string, filterData: string[]) => {
	return {
		type: VacanciesActionTypes.VACANCIES_FILTERED,
		payload: {
			filterName,
			filterData
		}
	}
}

export { actionFilter }