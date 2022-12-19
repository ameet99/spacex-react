import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { storeSearchTxt } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';

export const Header = () => {
	const searchTxt = useSelector(state => state.spaceXRed.searchTxt)
	const dispatch = useDispatch();

	const [tabValue, setTabValue] = useState(0)
	const [txt, setTxt] = useState(searchTxt);

	const handleClick = (tabVal) => {
		if (tabVal === 0) {
			setTabValue(0);
		} else {
			setTabValue(1);
		}
	}
	const handleChange = (e) => {
		const val = e.target.value
		dispatch(storeSearchTxt(val))
		setTxt(val);
	}
	return (
		<div className="container">
			<span className={tabValue === 0 ? 'activeLink' : 'link'} onClick={() => { handleClick(0) }}>
				<NavLink to="/History">SpaceX History</NavLink>
			</span>
			<span className={tabValue === 1 ? 'activeLink' : 'link'} onClick={() => { handleClick(1) }}>
				<NavLink to="/Address">SpaceX Address</NavLink>
			</span>

			<input
				className='input'
				type='text'
				placeholder='Search..'
				value={txt}
				onChange={(e) => handleChange(e)}
			/>
		</div>
	)
}	