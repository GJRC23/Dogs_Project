import Checkbox from "../Checkbox/Checkbox";
import s from "./FilterSection.module.css";

export default function FilterSection({ title, dataToMap, checked, onChange }) {
  if (!Array.isArray(dataToMap)) {
    return null; // O muestra un mensaje de carga, un indicador de carga o algo adecuado
  }

  return (
    <>
      <h3>{title}</h3>
      <ol className={s.list}>
        {dataToMap.map((data, i) => (
          <li key={data.id}>
            <Checkbox label={data.name} checked={checked(i)} onChange={() => onChange(data.id, data.name)} />
          </li>
        ))}
      </ol>
    </>
  );
}