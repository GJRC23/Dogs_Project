import { Link } from "react-router-dom";
import s from "./Home.module.css";

export default function Home() {
  return (
    <section className={s.container}>

      <div className={s.container__textSide}>
        <h1 className={s.container__textSide__text}>
          Find your <span className={s.container__textSide__text__underlined}>perfect</span> <span className={s.container__textSide__text__underlined__after}>friend</span>
        </h1>

        <Link className={s.container__textSide__button} to="/dogs">
          Start
        </Link>
      </div>

      <div className={s.container__imageSide}>
        <div className={s.container__imageSide__container}>

          <img className={s.container__imageSide__container__img} src={'https://newevolutiondesigns.com/images/freebies/4k-dog-wallpaper-1.jpg'} alt="dog" />

        </div>
      </div>

    </section>
  );
}