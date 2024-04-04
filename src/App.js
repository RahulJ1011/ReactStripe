import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Sucess from './components/Sucess';
import Cancel from './components/Cancel';
import Navbar from './components/Navbar';
import Cart from './components/Cart';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/sucess' element={<Sucess />} />
          <Route path='/cancel' element={<Cancel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
