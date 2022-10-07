import React, { useState, useRef, useEffect } from 'react';
import useLatest from 'use-latest';
import { useForm } from "react-hook-form";
import './search-bar.sass';
import filterIconImg1 from '../../assets/img/Vector.png';
import filterIconImg2 from '../../assets/img/Vector2.png';
import filterIconImg3 from '../../assets/img/Vector3.png';
import filterIconImg4 from '../../assets/img/Vector4.png';
import filterIconImg5 from '../../assets/img/Vector5.png';
import { useDispatch } from 'react-redux';
import { actionFilter } from '../../actions/filters';


const SearchBar: React.FC = () => {
	const dispatch = useDispatch();
	const [schedule, setSchedule] = useState(false);
	const [employment, setEmployment] = useState(false);
	const [experience, setExperience] = useState(false);

	const [check, setCheck] = useState({
		'fullDay': false,
		'flexible': false,
		'remote': false,
		'shift': false,
		'full': false,
		'little': false,
		'project': false,
		'intern': false,
		'noExperience': false,
		'between1And3': false,
		'between3And6': false,
		'moreThan6': false
	});
	const sheduleNameFull = 'fullDay';
	const sheduleNameFlex = 'flexible';
	const sheduleNameRemote = 'remote';
	const sheduleNameShift = 'shift';
	const employmentNameFull = 'full';
	const employmentNameLittle = 'little';
	const employmentNameProject = 'project';
	const employmentNameIntern = 'intern';
	const experienceNameNoExp = 'noExperience';
	const experienceName1And3 = 'between1And3';
	const experienceName3And6 = 'between3And6';
	const experienceNameMore6 = 'moreThan6';



	const popupRef1 = useRef<HTMLInputElement>(null)
	const popupRef2 = useRef<HTMLInputElement>(null)
	const popupRef3 = useRef<HTMLInputElement>(null)

	const soldCheckbox = (e: any) => {
		setCheck(prevState => ({ ...prevState, [e.target.name]: e.target.checked }))
	}

	const onClose = () => {
		setSchedule(false);
		setEmployment(false);
		setExperience(false);
	}

	const useOutsideClick = (
		elementRef: any,
		handler: any,
		attached = true) => {
		const latestHandler = useLatest(handler);

		useEffect(() => {
			if (!attached) return;

			const handlePopupClick = (e: any) => {
				if (!elementRef.current) return;
				// console.log(!elementRef.current.contains(e.target));

				if (!elementRef.current.contains(e.target)) {
					latestHandler.current();
				}
			};

			document.addEventListener("click", handlePopupClick);

			return () => {
				document.removeEventListener("click", handlePopupClick);
			};
		}, [elementRef, latestHandler, attached]);
	}

	useOutsideClick(popupRef1, onClose, schedule);
	useOutsideClick(popupRef2, onClose, employment);
	useOutsideClick(popupRef3, onClose, experience);

	let arrSchedule: string[] = [];
	let arrEmployment: string[] = [];
	let arrExperience: string[] = [];

	const searchButton = () => {
		let scheduleChecked = document.querySelectorAll('.filters-popup__schedule:checked')
		let employmentChecked = document.querySelectorAll('.filters-popup__employment:checked')
		let expreienceChecked = document.querySelectorAll('.filters-popup__experience:checked')

		scheduleChecked.forEach((el: any) => arrSchedule.push(el.name))
		employmentChecked.forEach((el: any) => arrEmployment.push(el.name))
		expreienceChecked.forEach((el: any) => arrExperience.push(el.name))

		dispatch(actionFilter('schedule', arrSchedule))
		dispatch(actionFilter('employment', arrEmployment))
		dispatch(actionFilter('experience', arrExperience))
	}

	const classActivePopupSchedule = schedule ? 'd-block' : null;
	const classActivePopupEmployment = employment ? 'd-block' : null;
	const classActivePopupExperience = experience ? 'd-block' : null;

	const popupSchedule = () => {
		return (
			<div className={`filters-popup ${classActivePopupSchedule}`} ref={popupRef1}>
				<div className="filters-popup__item">
					<input type="checkbox"
						checked={check[sheduleNameFull]}
						onChange={soldCheckbox}
						className="filters-popup__schedule"
						id="filters-popup__schedule11"
						name={sheduleNameFull} />
					<label className="filters-popup__label"
						htmlFor="filters-popup__schedule11">Полный день</label>
				</div>
				<div className="filters-popup__item">
					<input type="checkbox"
						checked={check[sheduleNameFlex]}
						onChange={soldCheckbox}
						className="filters-popup__schedule"
						id="filters-popup__schedule12"
						name={sheduleNameFlex} />
					<label className="filters-popup__label"
						htmlFor="filters-popup__schedule12">Гибкий график</label>
				</div>
				<div className="filters-popup__item">
					<input type="checkbox"
						checked={check[sheduleNameRemote]}
						onChange={soldCheckbox}
						className="filters-popup__schedule"
						id="filters-popup__schedule13"
						name={sheduleNameRemote} />
					<label className="filters-popup__label"
						htmlFor="filters-popup__schedule13">Удаленная работа</label>
				</div>
				<div className="filters-popup__item">
					<input type="checkbox"
						checked={check[sheduleNameShift]}
						onChange={soldCheckbox}
						className="filters-popup__schedule"
						id="filters-popup__schedule14"
						name={sheduleNameShift} />
					<label className="filters-popup__label"
						htmlFor="filters-popup__schedule14">Сменный график</label>
				</div>
			</div>
		)
	}

	const popupEmployment = () => {
		return (
			<div className={`filters-popup ${classActivePopupEmployment}`} ref={popupRef2}>
				<div className="filters-popup__item">
					<input type="checkbox"
						checked={check[employmentNameFull]}
						onChange={soldCheckbox}
						className="filters-popup__employment"
						id="filters-popup__employment21"
						name={employmentNameFull} />
					<label className="filters-popup__label"
						htmlFor="filters-popup__employment21">Полная занятость</label>
				</div>
				<div className="filters-popup__item">
					<input type="checkbox"
						checked={check[employmentNameLittle]}
						onChange={soldCheckbox}
						className="filters-popup__employment"
						id="filters-popup__employment22"
						name={employmentNameLittle} />
					<label className="filters-popup__label"
						htmlFor="filters-popup__employment22">Частичная занятость</label>
				</div>
				<div className="filters-popup__item">
					<input type="checkbox"
						checked={check[employmentNameProject]}
						onChange={soldCheckbox}
						className="filters-popup__employment"
						id="filters-popup__employment23"
						name={employmentNameProject} />
					<label className="filters-popup__label"
						htmlFor="filters-popup__employment23">Проектная работа</label>
				</div>
				<div className="filters-popup__item">
					<input type="checkbox"
						checked={check[employmentNameIntern]}
						onChange={soldCheckbox}
						className="filters-popup__employment"
						id="filters-popup__employment24"
						name={employmentNameIntern} />
					<label className="filters-popup__label"
						htmlFor="filters-popup__employment24">Стажировка</label>
				</div>
			</div>
		)
	}

	const popupExperience = () => {
		return (
			<div className={`filters-popup ${classActivePopupExperience}`} ref={popupRef3}>
				<div className="filters-popup__item">
					<input type="checkbox"
						checked={check[experienceNameNoExp]}
						onChange={soldCheckbox}
						className="filters-popup__experience"
						id="filters-popup__experience31"
						name={experienceNameNoExp} />
					<label className="filters-popup__label"
						htmlFor="filters-popup__experience31">Нет опыта</label>
				</div>
				<div className="filters-popup__item">
					<input type="checkbox"
						checked={check[experienceName3And6]}
						onChange={soldCheckbox}
						className="filters-popup__experience"
						id="filters-popup__experience32"
						name={experienceName3And6} />
					<label className="filters-popup__label"
						htmlFor="filters-popup__experience32">От 1 года до 3 лет</label>
				</div>
				<div className="filters-popup__item">
					<input type="checkbox"
						checked={check[experienceName1And3]}
						onChange={soldCheckbox}
						className="filters-popup__experience"
						id="filters-popup__experience33"
						name={experienceName1And3} />
					<label className="filters-popup__label"
						htmlFor="filters-popup__experience33">От 3 до 6 лет</label>
				</div>
				<div className="filters-popup__item">
					<input type="checkbox"
						checked={check[experienceNameMore6]}
						onChange={soldCheckbox}
						className="filters-popup__experience"
						id="filters-popup__experience34"
						name={experienceNameMore6} />
					<label className="filters-popup__label"
						htmlFor="filters-popup__experience34">Более 6 лет</label>
				</div>
			</div>
		)
	}

	return (
		<div className="filter-search">
			<div className="filters">
				<div className="filters__item">
					<div className="filters__icon">
						<img src={filterIconImg1} alt="" className="image" />
					</div>
					<input className="filters__text" type="text" placeholder="Введите город" />
				</div>
				<div className="filters__item"
					onClick={() => setSchedule(true)}>
					<div className="filters__icon">
						<img src={filterIconImg2} alt="" className="image" />
					</div>
					<p className="filters__title">Гибкий график</p>
					{popupSchedule()}
				</div>
				<div className="filters__item"
					onClick={() => setEmployment(true)}>
					<div className="filters__icon">
						<img src={filterIconImg3} alt="" className="image" />
					</div>
					<p className="filters__title">Частичная занятость</p>
					{popupEmployment()}
				</div>
				<div className="filters__item"
					onClick={() => setExperience(true)}>
					<div className="filters__icon">
						<img src={filterIconImg4} alt="" className="image" />
					</div>
					<p className="filters__title">От 1 года до 3 лет</p>
					{popupExperience()}
				</div>
				<div className="filters__item">
					<div className="filters__icon">
						<img src={filterIconImg5} alt="" className="image" />
					</div>
					<input className="filters__text w63px" type="number" placeholder="З/П" />
					<label className="filters__label "> руб.</label>
				</div>
			</div>
			<div className="search"
				onClick={searchButton}>Поиск</div>
		</div >
	)
}


export default SearchBar;