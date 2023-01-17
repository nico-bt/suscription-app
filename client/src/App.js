import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import LandingPage from './pages/LandingPage';
import Articles from './pages/Articles';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/articles' element={<Articles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
