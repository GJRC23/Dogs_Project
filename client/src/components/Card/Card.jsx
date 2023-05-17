import './Card.css';
import { Link } from 'react-router-dom';

export default function Card({ id, name, weight, height, temperament, origin, image }) {
  return (
    <div className="card">
      <img className="cardImg" src={image} alt='' />
      <div className="datos">
        <Link id= "name" to={`/detail/${id}`}>
          <h2 id="name">{name}</h2>
        </Link>
          <h3 id="weight">Weight: {weight}</h3>
          <h3 id="height">Height: {height}</h3>
          {temperament && <h3 id="temperament">Temperament: {temperament.join(', ')}</h3>}
      </div>
    </div>
  );
}
