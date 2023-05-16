import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterDogsByTemperament, filterDogsByDogs } from "../../redux/actions";
import FilterSection from "../FilterSection/FilterSection";
import s from "./Sidebar.module.css";

export default function Sidebar() {
  const [checkedValues, setCheckedValues] = useState({ temperaments: {}, dogs: {} });
  const _isMounted = useRef(false);
  const dispatch = useDispatch();
  const { dogs: dogsData, temperaments } = useSelector((state) => state);
  const { data: dogs, __activeFilters } = dogsData;
  const { dogs: activeDogsFilter } = __activeFilters;

  const handleChecked = (id, name, toUpdateKey) => {
    setCheckedValues((prevCheckedValues) => {
      const { temperaments, dogs } = prevCheckedValues;
      const newCheckedValues = toUpdateKey === "temperaments" ? { temperaments: { ...temperaments }, dogs } : { temperaments, breeds: { ...dogs } };
      if (!newCheckedValues[toUpdateKey][id]) newCheckedValues[toUpdateKey][id] = name;
      else delete newCheckedValues[toUpdateKey][id];

      return newCheckedValues;
    });
  };

  useEffect(() => _isMounted.current && dispatch(filterDogsByTemperament(Object.values(checkedValues.temperaments))), [checkedValues.temperaments, dispatch]);
  useEffect(() => _isMounted.current && dispatch(filterDogsByDogs(Object.values(checkedValues.dogs))), [checkedValues.dogs, dispatch]);
  useEffect(() => {
    _isMounted.current = true;
    return () => (_isMounted.current = false);
  }, []);

  return (
    <aside className={s.container}>
      <FilterSection title="Temperament" dataToMap={temperaments} checked={(i) => !!checkedValues.temperaments[i]} onChange={(id, name) => handleChecked(id, name, "temperaments")} />
      <FilterSection title="Dog" dataToMap={dogs} checked={(i) => activeDogsFilter[i] || !!checkedValues.dogs[i]} onChange={(id, name) => handleChecked(id, name, "dogs")} />
    </aside>
  );
}
