import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { storeAddress } from '../../redux';
import '../SpaceXHistory/SpaceXHistory.css';

const itemsPerPage = 10;

export const SpaceXAddress = () => {
	const spaceAddData = useSelector(state => state.spaceXRed.addressData)
	const searchTxt = useSelector(state => state.spaceXRed.searchTxt)

	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	const [itemOffset, setItemOffset] = useState(0);

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

	const endOffset = itemOffset + itemsPerPage;
	const currentItems = data.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(data.length / itemsPerPage);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % data.length;
		setItemOffset(newOffset);
	};

	return (
		<div className='box'>
			<DisplayData currentItem={currentItems} />
			<div className='pagination'>
				<ReactPaginate
					breakLabel="..."
					nextLabel="next >"
					onPageChange={handlePageClick}
					pageRangeDisplayed={5}
					pageCount={pageCount}
					previousLabel="< previous"
					renderOnZeroPageCount={null}
					itemClass="page-item"
					linkClass="page-link"
				/>
			</div>
		</div>
	)
};

const DisplayData = (props) => (
	<>
		{props.currentItem?.map((item, index) => (
			<div key={`address-${index}`} className='card'>
				<h3>Payload Id: {item.payload_id} </h3>
				<h3>Nationality: {item.nationality} </h3>
				<h3>Manufacturer: {item.manufacturer} </h3>
				<h3>Payload Type: {item.payload_type} </h3>
			</div>
		))}
	</>
);

