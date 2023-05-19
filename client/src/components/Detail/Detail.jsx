import './Detail.css'
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Detail = () => { // Asegúrate de pasar la prop onSearch correctamente
    const { id } = useParams();
    const [dog, setDog] = useState({});

    useEffect(() => {
        axios(`http://localhost:3001/dogs/${id}`)
        .then(response => response.data)
        .then((data) => {
           if (data.name) {
            setDog(data);
           } else {
              window.alert('No hay personajes con ese ID');
           }
        });
        return setDog({});
    }, [id]);

    return (
        <div className="detail-container">
            <Link to='/home' className='BackBtn'>{"<- BACK"}</Link>

            <div className="detail-titles">
                <h1 id="detailH1">{dog?.name}</h1>

                <div className="detailH1">
                    <h2 className="detailH2">HEIGHT : {dog?.height}</h2>
                    <h2 className="detailH2">WEIGHT : {dog?.weight}</h2>
                    <h2 className="detailH2">LIFE SPAN : {dog?.age}</h2>
                    {dog?.temperament && <h2 className="detailH2">TEMPERAMENT: {dog?.temperament.join(', ')}</h2>}
                    <h2 className="detailH2">ORIGIN : {dog?.origin}</h2>
                    <h2 className="detailH2">ID : {dog?.id}</h2>
                </div>
            </div>

            <div className="image-container">
                <img className="imgDetail" src={dog?.image} alt={dog?.name} />
            </div>
        </div>
    )
}

export default Detail;