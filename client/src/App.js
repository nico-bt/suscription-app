import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import LandingPage from './pages/LandingPage';
import Articles from './pages/Articles';
import ProtectedRoute from './components/routes/ProtectedRoute';
import ArticlesPlan from './pages/ArticlePlan';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        
        <Route path='/articles' element={<ProtectedRoute />}> 
          <Route path='/articles' element={<Articles />} />
        </Route>
        
        <Route path='/articles-plan' element={<ProtectedRoute />}> 
          <Route path='/articles-plan' element={<ArticlesPlan />} />
        </Route>

        <Route path='*' element={ <Navigate to={"/"} />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
