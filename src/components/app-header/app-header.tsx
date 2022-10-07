import React from 'react';
import { Link } from "react-router-dom";
import './app-header.sass';

const AppHeader: React.FC = () => {


	return (
		<header className="header_wrapper">
			<div className="header">
				<div className="header__logo_wrapper">
					<Link to="/" className="header__logo">
						<span className="color_red">hh</span>ANALOG
					</Link>
				</div>
				<nav className="menu">
					<Link to="/" className="menu__item">
						Поиск ваканский
					</Link>
					<Link to="/" className="menu__item">
						Избранные вакансии
					</Link>
				</nav>
			</div>
		</header>
	)
}


export default AppHeader;