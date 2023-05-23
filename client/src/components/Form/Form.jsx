import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postDog, getTemps } from "../../redux/actions";
import { validate } from "./validate";
// import { Link } from "react-router-dom"; //? Proximamente NavBar
import styles from "../Form/Form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    id: "",
    name: "",
    height: "",
    weight: "",
    age: "",
    image: "",
    createInDb: "",
    temperament: [],
    temperaments: [],
  });

  useEffect(() => {
    dispatch(getTemps());
  }, [dispatch]);

  const temperaments = useSelector((state) => state.temperaments);
  const [selectedTemps, setSelectedTemps] = useState([]);
  const [errors, setErrors] = useState({});
  const [filter] = useState("");
  const filteredTemps = temperaments?.filter((temp) =>
    temp.toLowerCase().includes(filter.toLowerCase())
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "age" || name === "weight" || name === "height") {
      const formattedValue = value.replace(/(\d{2})\s-\s(\d{2})/, "$1 - $2");
      setInput((prevInput) => ({
        ...prevInput,
        [name]: formattedValue,
      }));
    } else {
      setInput((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));
    }
    setErrors(
      validate({
        ...input,
        [name]: value,
      })
    );
  };

  const handleSelect = (event) => {
    const selectedTemperament = event.target.value;
    setInput((prevInput) => ({
      ...prevInput,
      temperament: [...prevInput.temperament, selectedTemperament],
      temperaments: Array.isArray(prevInput.temperaments)
        ? [...prevInput.temperaments, selectedTemperament]
        : [selectedTemperament],
    }));
    setSelectedTemps((prevSelectedTemperaments) => [
      ...prevSelectedTemperaments,
      selectedTemperament,
    ]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(input);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(postDog(input)).then((response) => {});
      alert("Breed created successfully");
    } else {
      alert("Please fix the following errors:");
      setErrors(validationErrors);
    }
  };
  const handleRemove = (temperament) => {
    setSelectedTemps((prevSelectedTemps) =>
      prevSelectedTemps.filter((temp) => temp !== temperament)
    );
  };
  return (
    <div className={styles.container}>

      <Link to='/home' className={styles.BackBtnCreate}>{"Back"}</Link>

      <div className={`${styles.card} ${styles.Form}`}>
        <form onSubmit={handleSubmit}>
            <h1>Create your own Dog !</h1>
            <div className={styles.FormText}>
              <label>Breed:</label>
              <input type="text" value={input.name} name="name" onChange={handleChange}/>
              {errors.name && <p>{errors.name}</p>}
              <br />
              <label>Height:</label>
              <input type="text" value={input.height} name="height" onChange={handleChange} />
              {errors.height && <p>{errors.height}</p>}
              <br />
              <label>Weight:</label>
              <input type="text" value={input.weight} name="weight" onChange={handleChange} />
              {errors.weight && <p>{errors.weight}</p>}
              <br />
              <label>Life Span:</label>
              <input type="text" value={input.age} name="age" onChange={handleChange} />
              {errors.age && <p>{errors.age}</p>}
              <br />
              <label>Image:</label>
              <input type="text" value={input.image} name="image" onChange={handleChange} />
              {errors.image && <p>{errors.image}</p>}
              <br />
              <label>Temperament:</label>
              {errors.temperaments && <p>{errors.temperaments}</p>}
              <select className={styles.tempOp} onChange={handleSelect}>
                <option className={styles.tempBtn} value="">Seleccionar</option>
                {filteredTemps?.map((temp) => (
                  <option key={temp} value={temp}> {temp} </option>
                ))}
              </select>
              <ul>
                {selectedTemps?.map((temp) => (
                  <div key={temp?.id}>
                    <li>
                      {temp}
                      {""}{" "}
                      <img className={styles.xBtn} onClick={() => handleRemove(temp)} src="https://us.123rf.com/450wm/passatic/passatic2009/passatic200900005/156108915-icono-de-vector-x-cruz-roja-ning%C3%BAn-s%C3%ADmbolo-incorrecto-eliminar-firmar-el-voto-conjunto-de.jpg?ver=6" alt='' />
                    </li>
                  </div>
                ))}
              </ul>
              <button className={styles.submit} type="submit">
                Create
              </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
