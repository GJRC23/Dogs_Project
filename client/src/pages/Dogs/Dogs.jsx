import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetDogsDetails } from "../../common/redux/actions";
import Sidebar from "../../common/components/Sidebar/Sidebar";
import DogCards from "../../common/components/DogCards/DogCards";
import s from "./Dogs.module.css";

export default function Dogs() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(resetDogsDetails()), [dispatch]);

  return (
    <section className={s.container}>
      <Sidebar />
      <DogCards />
    </section>
  );
}