import { Link } from "react-router-dom";
import ImagePlaceholder from "../ImagePlaceholder/ImagePlaceholder";
import Characteristic from "../Characteristic/Characteristic";
import Pill from "../Pill/Pill";
import { Weight } from "../Icons";
import s from "./DogCard.module.css";

export default function DogCard({ className, dog, path, showTemperaments = true }) {
  return (
    <Link className={`${s.container} ${className}`} to={`${path}/${dog.id}`}>
      <div className={s.container__imgContainer}>{dog?.image ? <img className={s.container__imgContainer__img} src={dog.image.url} alt={dog.name} /> : <ImagePlaceholder />}</div>
      <div className={s.container__textContainer}>
        <div>
          <span className={s.container__textContainer__title}>{dog.name}</span>
        </div>
        <Characteristic icon={<Weight />} text={`~${dog.weight || ""}kg`} />
        {showTemperaments && (
          <div className={s.container__textContainer__temperaments}>
            {dog.temperaments.map((temperament, i) => (
              <Pill key={`${temperament}-${i}`} label={temperament} />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
