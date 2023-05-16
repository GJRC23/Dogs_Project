import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { requestDogsByID } from "../../common/redux/actions";
import { Height, Hourglass, Weight } from "../../common/components/Icons";
import ImagePlaceholder from "../../common/components/ImagePlaceholder/ImagePlaceholder";
import Characteristic from "../../common/components/Characteristic/Characteristic";
import Pill from "../../common/components/Pill/Pill";
import Slider from "../../common/components/Slider/Slider";
import s from "./DogDetail.module.css";

export default function DogDetails() {
  const dog = useSelector((state) => state["selectedDogsDetails"]);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => dispatch(requestDogsByID(id)), [dispatch, id]);

  return (
    <section className={s.container}>
      {dog && (
        <div className={s.container__card}>
          <div className={s.container__card__image}>{dog.image ? <img src={dog?.image?.url} alt="" /> : <ImagePlaceholder />}</div>
          <div className={s.container__card__details}>
            <div className={s.container__card__details__name}>
              <h1>{dog.name}</h1>
            </div>
            <div className={s.container__card__details__characteristic}>
              <div className={s.container__card__details__characteristic_list}>
                <div>
                  <h3>Weight:</h3>
                  <Characteristic icon={<Weight />} text={`~${dog.weight || ""}kg`} />
                </div>
                <div>
                  <h3>Height:</h3>
                  <Characteristic icon={<Height />} text={`~${dog.height || ""}cm`} />
                </div>
                <div>
                  <h3>Life span:</h3>
                  <Characteristic icon={<Hourglass />} text={`~${dog.life_span || ""}years`} />
                </div>
              </div>
            </div>
            <div className={s.container__card__details__temperaments}>{dog.temperaments && dog.temperaments.map((temperament, i) => <Pill key={`${temperament}-${i}`} label={temperament} />)}</div>
            <Slider />
          </div>
        </div>
      )}
    </section>
  );
}
