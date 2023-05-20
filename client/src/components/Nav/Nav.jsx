import './Nav.css';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { Link } from 'react-router-dom';

const Nav = ({ handleChange, handleSubmit }) => {
  return (
    <nav>
        <Link to='/' className='agregarBtn'>Back</Link>
        <h1>Furry Friends: The Playful World of Dog Breeds</h1>
        <Link to='/about'className='agregarBtn'>About</Link>
        <Link to='/create'className='agregarBtn'>Create Dog</Link>
        <SearchBar />
    </nav>
  );
};

export default Nav;

