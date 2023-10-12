import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import "./index.scss"

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  )

  return (
    <div className="pagination">
      <button className="pag-previous">
        <FontAwesomeIcon icon={faChevronLeft} />
        Previous
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={number === currentPage ? "active" : ""}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      <button className="pag-next">
        Next
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  )
}

export default Pagination
