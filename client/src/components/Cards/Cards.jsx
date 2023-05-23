import './Cards.css';
import Card from '../Card/Card.jsx';

import { useSelector } from "react-redux";

const Cards = () => {
  const { allDogs, page } = useSelector((state) => state);

  let desde = (page - 1) * 8 + 1; // Ajustar el inicio del rango de tarjetas
  let hasta = page * 8;

  const dogs = allDogs?.slice(desde - 1, hasta); // Ajustar los límites del slice

  return (
    <div className="cards">
      {
        dogs && dogs.map(({ id, name, weight, height, temperaments, temperament, origin, image, createInDb }) => {
          return (
            <Card
              key={id}
              id={id}
              name={name}
              weight={weight}
              height={height}
              temperaments={temperaments}
              temperament={temperament}
              origin={origin}
              image={image}
              createInDb={createInDb}
            />
          );
        })
      }
    </div>
  );
}

export default Cards;