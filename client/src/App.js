import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Nav from './components/Nav';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Hero />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
