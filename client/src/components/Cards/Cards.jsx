import './Cards.css';
import Card from '../Card/Card.jsx';

import { useSelector } from "react-redux";

const Cards = () => {
  const { dogsFyO, page } = useSelector(state => state);

  let desde = (page - 1) * 12;
  let hasta = page * 12;

  const dogs = dogsFyO?.slice(desde, hasta);

  return (
    <div className="cards">
      {
        dogs.map(({ id, name, weight, height, temperament, origin, image }) => {
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