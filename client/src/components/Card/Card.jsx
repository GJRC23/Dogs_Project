import './Card.css';
import { Link } from 'react-router-dom';

const Card = ({ id, name, weight, temperaments, temperament, image, createInDb }) => {
  return (
      <Link className="pres" to={`/detail/${id}`}>
      <div className="card">
        <img className="cardImg" src={image} alt='' />
        <div className="datos">
          
          <h2 className="name">{name}</h2>

          <h3>Weight: {weight} kg</h3>

          {createInDb && Array.isArray(temperaments) && temperaments.length ? (
            <h3> Temperamentos: {temperaments.join(", ")} </h3>
          ) : Array.isArray(temperament) && temperament.length ? (
            <h3>Temperamentos: {temperament?.join(", ")} </h3>
          ) : null}
        </div>
      </div>
      </Link>
  );
}

export default Card;