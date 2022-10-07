import React from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import './vacancy.sass';

const Vacancy: React.FC = () => {
	const { vacancy, loading, error } = useTypedSelector(state => state.vacancyData)
	const { name, area, employer, description, salary } = vacancy;

	const vacancyDescription = () => {
		return { __html: description };
	}

	if (loading) {
		return <h1>Загурзка...</h1>
	}
	if (error) {
		return <h1>{error}</h1>
	}

	const checkSalary = () => {
		if (!salary) return ''
		else {
			if (!salary.from && salary.to) return salary.to + ' руб.'
			else if (salary.from && !salary.to) return salary.from + ' руб.'
			else return 'от ' + salary.from + ' до ' + salary.to + ' руб.'
		}

	}

	if (Object.entries(vacancy).length !== 0) console.log(vacancy.employment)
	// console.log(vacancy.schedule)
	return (
		<>
			{(Object.entries(vacancy).length !== 0) ?
				<div className="vacancy">
					<div className="vacancy-wrapper">
						<div className="vacancy-header">
							<div className="vacancy-header__upper-wrapper">
								<div className="vacancy-header__logo">
									<img src={(employer.logo_urls === null) ? '' : employer.logo_urls.original} alt="Logo" className="image" />
								</div>
								<div className="vacancy-header__title-company-city-wrapper">
									<p className="vacancy-header__title">{name}</p>
									<div className="vacancy-header__city-company-wrapper">
										<p className="vacancy-header__company">{employer.name}</p>
										<p className="vacancy-header__city">{area.name}</p>
									</div>
								</div>
							</div>
							<p className="vacancy-header__salary">
								{checkSalary()}
							</p>
						</div>
						<div className="vacancy-description"
							dangerouslySetInnerHTML={vacancyDescription()}></div>
					</div>
				</div>
				: ''
			}
		</>
	)
}


export default Vacancy;