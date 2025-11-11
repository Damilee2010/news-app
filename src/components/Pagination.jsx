import React from 'react'

const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => {
    const disablePrev = currentPage <= 1;
    const disableNext = currentPage >= totalPages;

  return (
    <div className="join flex justify-center mt-4">
        <button className={`join-item btn ${disablePrev ? "btn-disabled" : ""}`} onClick={onPrev} disabled={disablePrev}>Previous</button>
        <button className='join-item btn btn-disabled no-animation'>Page {currentPage} of {totalPages}   </button>
        <button className={`join-item btn ${disableNext ? "btn-disabled" : ""}`     } onClick={onNext} disabled={disableNext}>Next</button>
    </div>
  )
}

export default Pagination