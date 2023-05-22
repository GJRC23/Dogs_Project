import './Cards.css';
import Card from '../Card/Card.jsx';

import { useSelector } from "react-redux";

const Cards = () => {
  const { allDogs, page } = useSelector(state => state);

  let desde = (page - 1) * 8;
  let hasta = page * 8;

  const dogs = allDogs?.slice(desde, hasta);

  return (
    <div className="cards">
      {
        dogs && dogs.map(({ id, name, weight, height, temperament, origin, image }) => {
          return (
            <Card
              key={id}
              id={id}
              name={name}
              weight={weight}
              height={height}
              temperament={temperament}
              origin={origin}
              image={image}
            />
          );
        })
      }
    </div>
  );
}

export default Cards;