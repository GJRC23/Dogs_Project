import './Cards.css';
import Card from '../Card/Card.jsx';

export default function Cards({ dogs }) {
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