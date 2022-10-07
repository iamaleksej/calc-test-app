import { Dispatch } from "redux";
import axios from "axios";
import { VacancyAction, VacancyActionTypes } from "../components/types";

export const fetchVacancy = (id: number) => {
	return async (dispatch: Dispatch<VacancyAction>) => {
		try {
			dispatch({ type: VacancyActionTypes.FETCH_VACANCY })
			const response = await axios.get(`https://api.hh.ru/vacancies/${id}`)
			console.log(response.data)
			dispatch({ type: VacancyActionTypes.FETCH_VACANCY_SUCCESS, payload: response.data })
		} catch (e) {
			dispatch({
				type: VacancyActionTypes.FETCH_VACANCY_ERROR,
				payload: 'Произошла ошибка при загрузке вакансии'
			})
		}
	}
}