import './Paginate.css'
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, backPage } from "../../redux/actions";

const Paginate = () => {

    const dispatch = useDispatch();

    const { page } = useSelector(state => state);

    const next = () => {
        dispatch(nextPage())
    }
    const back = () => {
        dispatch(backPage())
    }

    return (
        <div className="pagCont">
            <button className='agregarBtn' onClick={back}>BACK</button>
            <p id="numPage">{page - 1}</p>

            <p>{page}</p>

            <p>{page + 1}</p>

            <button className='agregarBtn' onClick={next}>NEXT</button>
        </div>
    )
}

export default Paginate;
