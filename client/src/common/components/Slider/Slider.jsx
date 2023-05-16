import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestRandomDogs } from "../../redux/actions";
import { ChevronLeft, ChevronRight } from "../Icons";
import DogCard from "../DogCard/DogCard";
import s from "./Slider.module.css";

export default function Slider() {
  const sliderRef = useRef();
  const [sliderPosition, setSliderPosition] = useState(0);
  const randomDogs = useSelector((state) => state["selectedDogsDetails"]["randomDogs"]);
  const dispatch = useDispatch();

  const handleNextBackButtonClick = (goTo) => {
    const element = sliderRef.current;
    const cardGap = parseInt(getComputedStyle(element).gridColumnGap.replace(/[^\d.]/g, "")) / randomDogs.length || 0;
    const cardSize = element.scrollWidth / randomDogs.length + cardGap;
    const currentTranslation = -parseInt(element.style.transform.replace(/[^\d.]/g, "")) || 0;
    const newTranslation = goTo === "next" ? currentTranslation - cardSize : currentTranslation + cardSize;
    element.style.transform = `translateX(${newTranslation}px)`;

    setSliderPosition((prevSliderPosition) => (goTo === "next" ? ++prevSliderPosition : --prevSliderPosition));
  };

  useEffect(() => !randomDogs && dispatch(requestRandomDogs()), [dispatch, randomDogs]);
  useEffect(() => randomDogs && setSliderPosition(0), [randomDogs]);

  if (!randomDogs) return null;
  return (
    <div className={s.container}>
      <span className={s.container__title}>See also:</span>
      {sliderPosition > 0 && (
        <button className={`${s.container__nextBackButton} ${s.container__backButton}`} onClick={() => handleNextBackButtonClick("back")}>
          <ChevronLeft />
        </button>
      )}
      <div ref={sliderRef} className={s.container__slider}>
        {randomDogs.map((dog, i) => (
          <DogCard className={s.container__slider__card} {...{ dog }} path={"../dogs"} showTemperaments={false} key={`similarDog-${i}`} />
        ))}
      </div>
      {sliderPosition < randomDogs.length - 1 && (
        <button className={`${s.container__nextBackButton} ${s.container__nextButton}`} onClick={() => handleNextBackButtonClick("next")}>
          <ChevronRight />
        </button>
      )}
    </div>
  );
}
