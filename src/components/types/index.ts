export interface VacanciesState {
	vacancies: { items: IVacancy[] };
	loading: boolean;
	error: null | string;
	filter: {}
}

export interface VacancyState {
	vacancy: any;
	loading: boolean;
	error: null | string
}

export interface IArea {
	name: string;
}

// export interface IFilter {
// 	schedule: string[],
// 	employment: string[],
// 	experience: string[]
// }

export interface IEmployer {
	name: string;
	logo_urls: { original: string; 90: string; 240: string; };
}
export interface IVacancy {
	id: number;
	name: string;
	area: IArea;
	employer: IEmployer;
	published_at: string;
	employment: { id: string; name: string; };
	schedule: { id: string }
	experience: { id: string }
}

export enum VacanciesActionTypes {
	FETCH_VACANCIES = 'FETCH_VACANCIES',
	FETCH_VACANCIES_SUCCESS = 'FETCH_VACANCIES_SUCCESS',
	FETCH_VACANCIES_ERROR = 'FETCH_VACANCIES_ERROR',
	VACANCIES_FILTERED = 'VACANCIES_FILTERED'
}

interface FetchVacanciesAction {
	type: VacanciesActionTypes.FETCH_VACANCIES;
}
interface FetchVacanciesSuccesAction {
	type: VacanciesActionTypes.FETCH_VACANCIES_SUCCESS;
	payload: { items: [] };
}
interface FetchVacanciesErrorAction {
	type: VacanciesActionTypes.FETCH_VACANCIES_ERROR;
	payload: string;
}
interface VacanciesFilteredAction {
	type: VacanciesActionTypes.VACANCIES_FILTERED;
	payload: any
}

export enum VacancyActionTypes {
	FETCH_VACANCY = 'FETCH_VACANCY',
	FETCH_VACANCY_SUCCESS = 'FETCH_VACANCY_SUCCESS',
	FETCH_VACANCY_ERROR = 'FETCH_VACANCY_ERROR',
}

interface FetchVacancyAction {
	type: VacancyActionTypes.FETCH_VACANCY;
}
interface FetchVacancySuccesAction {
	type: VacancyActionTypes.FETCH_VACANCY_SUCCESS;
	payload: {};
}
interface FetchVacancyErrorAction {
	type: VacancyActionTypes.FETCH_VACANCY_ERROR;
	payload: string;
}

export type VacanciesAction = FetchVacanciesAction | FetchVacanciesSuccesAction | FetchVacanciesErrorAction | VacanciesFilteredAction;
export type VacancyAction = FetchVacancyAction | FetchVacancySuccesAction | FetchVacancyErrorAction;