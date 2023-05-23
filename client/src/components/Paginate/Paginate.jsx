import './Paginate.css';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, backPage, setPage } from "../../redux/actions";

const Paginate = () => {
  const dispatch = useDispatch();
  const { page, totalPages } = useSelector((state) => state);

  const next = () => {
    dispatch(nextPage());
    window.scrollTo(0, 0);
  };

  const back = () => {
    dispatch(backPage());
    window.scrollTo(0, 0);
  };

  const goToFirstPage = () => {
    dispatch(setPage(1));
    window.scrollTo(0, 0);
  };

  const goToLastPage = () => {
    if (page < totalPages) {
      dispatch(setPage(totalPages));
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className="pagCont">
      <button className="agregarBtn" onClick={goToFirstPage} disabled={page === 1}>
        First Page
      </button>
      <button className="agregarBtn" onClick={back} disabled={page === 1}>
        BACK
      </button>
      <p id="numPage">{page}</p>
      <button className="agregarBtn" onClick={next} disabled={page === totalPages}>
        NEXT
      </button>
      <button className="agregarBtn" onClick={goToLastPage} disabled={page === totalPages}>
        Last Page
      </button>
    </div>
  );
};

export default Paginate;