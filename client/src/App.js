import './App.css';

import { Routes, Route} from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import LandingPage from './components/LandingPage/LandingPage';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import About from './components/About/About';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home/>} />
        <Route path='/detail/:id' element={<Detail/>} />
        <Route path='/create' element={<Form/>} />
        <Route path='/about' element={<About/>} />
      </Routes>
    </div>
  );
}

export default App;
