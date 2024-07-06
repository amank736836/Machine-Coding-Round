import React from "react";

function Pagination({ pageNo, setPageNo }) {
  const prevThreeNoArr = Array.from(
    { length: 3 },
    (_, index) => pageNo - index - 1
  )
    .filter((num) => num > 0)
    .reverse();

  const nextThreeNoArr = Array.from(
    { length: 3 },
    (_, index) => pageNo + index + 1
  );

  const paginationArr = [...prevThreeNoArr, pageNo, ...nextThreeNoArr];

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  const handlePrev = () => {
    setPageNo(pageNo - 1);
  };

  return (
    <div className="pagination-container">
      {pageNo > 1 ? (
        <div className="page-btn" onClick={handlePrev}>
          ⏮️
        </div>
      ) : (
        ""
      )}
      {paginationArr.map((num) => (
        <div
          key={num}
          className={`page-btn ${num === pageNo ? "active" : ""}`}
          onClick={() => setPageNo(num)}
        >
          {num}
        </div>
      ))}
      <div className="page-btn" onClick={handleNext}>
        ⏭️
      </div>
    </div>
  );
}

export default Pagination;
