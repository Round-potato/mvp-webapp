import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages /Home';
import RecipePage from './pages /RecipePages';
import Nopage from './pages /Nopage';



const App = () => (
  <>
    <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/recipes" element={<RecipePage />} />
      <Route path="*" element={<Nopage />} />
    </Routes>
    </BrowserRouter>
  </>
);

export default App;
