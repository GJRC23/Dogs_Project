import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import Searchbar from "../Searchbar/Searchbar";
import s from "./Nav.module.css";

export default function Navbar() {
  return (
    <nav className={s.container}>
      <Link className={s.container__logo} to="/" children={<Logo />} />
      <div className={s.container__rightSide}>
        <div className={s.container__rightSide__links}>
          <Link to="/dogs" children="LIST" />
          <Link to="/create/dogs" children="CREATE" />
        </div>
        <Searchbar />
      </div>
    </nav>
  );
}