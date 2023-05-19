import './App.css';

import { Routes, Route} from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import LandingPage from './components/LandingPage/LandingPage';
import Detail from './components/Detail/Detail';
import Create from './components/Create/Create';

function App() {
  

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home/>} />
        <Route path='/detail/:id' element={<Detail/>} />
        <Route path='/create' element={<Create/>} />
      </Routes>
    </div>
  );
}

export default App;
