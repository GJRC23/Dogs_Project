import { useEffect } from "react";
import { useRouteMatch } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { requestAll } from "../../redux/actions";
import CardsHeader from "../CardsHeader/CardsHeader";
import DogCard from "../DogCard/DogCard";
import Pagination from "../Pagination";
import s from "./DogCards.module.css";

export default function Cards() {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const { data, pagination } = useSelector((state) => state["dogs"]);
  const maxCardsPerPage = 12;
  const paginatedDogs = data.slice((pagination - 1) * maxCardsPerPage, pagination * maxCardsPerPage);

  useEffect(() => dispatch(requestAll()), [dispatch]);

  return (
    <div className={s.container}>
      <CardsHeader />
      {paginatedDogs.map((dog) => (
        <DogCard {...{ dog, path }} key={dog.id} />
      ))}
      <Pagination pagesQuantity={Math.ceil(data.length / maxCardsPerPage)} currentPage={pagination} />
    </div>
  );
}





