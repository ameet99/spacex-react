import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { storeHistory } from '../../redux';
import './SpaceXHistory.css';

const itemsPerPage = 10;

export const SpaceXHistory = () => {
  const spaceHisData = useSelector(state => state.spaceXRed.historyData)
  const searchTxt = useSelector(state => state.spaceXRed.searchTxt)

  const dispatch = useDispatch();
  const [data, setData] = useState(spaceHisData);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    if (!spaceHisData.length) {
      fetch('https://api.spacexdata.com/v3/history')
        .then((response) => response.json())
        .then((res) => {
          if (res.length) {
            dispatch(storeHistory(res));
            setData(res)
          }
        }).catch(err => {
          console.log('err-->', err)
        })
    }
  }, [])

  useEffect(() => {
    const txt = searchTxt.toLowerCase();
    const filterData = spaceHisData?.filter(i => {
      if (toString(i.id).includes(txt) ||
        i.title.toLowerCase().includes(txt) ||
        i.event_date_utc.toLowerCase().includes(txt) ||
        toString(i.flight_number).includes(txt)) {
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
}

const DisplayData = (props) => (
  <>
    {props.currentItem?.map((item, index) => (
      <div key={`history-${index}`} className='card'>
        <h3>id: {item.id} </h3>
        <h3>title: {item.title} </h3>
        <h3>event Date: {item.event_date_utc} </h3>
        <h3>flight Number: {item.flight_number} </h3>
      </div>
    ))}
  </>
)