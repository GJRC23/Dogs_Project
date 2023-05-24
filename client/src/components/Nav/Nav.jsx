import './Nav.css';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { Link } from 'react-router-dom';

const Nav = ({ handleChange, handleSubmit }) => {
  return (
    <nav>
        <Link to='/' className='agregarBtn'>Back</Link>
        <img className="logo" src={'https://images.vexels.com/media/users/3/227568/isolated/preview/6152903b89a24ce55998fee1e3147634-logotipo-naranja-shephard-alem-n.png'} alt='' />
        <h1>Furry Friends: The Playful World</h1>
        <Link to='/about'className='agregarBtn'>About</Link>
        <Link to='/create'className='agregarBtn'>Create Dog</Link>
        <SearchBar />
    </nav>
  );
};

export default Nav;

