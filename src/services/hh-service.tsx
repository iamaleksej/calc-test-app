
class HhService {

	// _apiBase = 'https://api.hh.ru';

	// async getData(url: string) {
	// 	const res = await fetch(`${this._apiBase}${url}`);

	// 	if (!res.ok) {
	// 		throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
	// 	}
	// 	return await res.json();

	// }

	// async getAllVacancies() {
	// 	const res = await this.getData('/vacancies/');
	// 	return res.items;
	// }

	// getVacancy(id: number) {
	// 	return this.getData(`/vacancies/${id}/`)
	// }
}

const hhService = new HhService();

// hhService.getAllVacancies().then((vacancies) => {
// 	vacancies.forEach((v: any) => {
// 		// console.log(v);
// 	})
// })
export default HhService;