import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeAddress } from '../../redux';
import '../SpaceXHistory/SpaceXHistory.css';

export const SpaceXAddress = () => {
	const spaceAddData = useSelector(state => state.spaceXRed.addressData)
	const searchTxt = useSelector(state => state.spaceXRed.searchTxt)

	const dispatch = useDispatch();
	const [data, setData] = useState([]);

	useEffect(() => {
		if (!spaceAddData.length) {
			fetch('https://api.spacexdata.com/v3/payloads')
				.then((response) => response.json())
				.then((res) => {
					if (res.length) {
						dispatch(storeAddress(res))
						setData(res)
					}
				}).catch(err => {
					console.log('err-->', err)
				})
		}
	}, [])

	useEffect(() => {
		const txt = searchTxt?.toLowerCase();
		const filterData = spaceAddData?.filter(i => {
			if (i.payload_id?.toLowerCase()?.includes(txt) ||
				i?.nationality?.toLowerCase()?.includes(txt) ||
				i?.manufacturer?.toLowerCase()?.includes(txt) ||
				i?.payload_type?.toLowerCase()?.includes(txt)) {
				return i;
			}
		})
		setData(filterData)
	}, [searchTxt])
	return (
		<div className='box'>
			{data.map((item, index) => (
				<div key={`address-${index}`} className='card'>
					<h3>Payload Id: {item.payload_id} </h3>
					<h3>Nationality: {item.nationality} </h3>
					<h3>Manufacturer: {item.manufacturer} </h3>
					<h3>Payload Type: {item.payload_type} </h3>
				</div>
			))}
		</div>
	)
}