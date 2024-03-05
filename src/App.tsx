import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Home } from './Pages/home/Home';
import { Navbar } from './Components/Navbar';
import { CreatePost } from './Pages/post/create-post';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/create-post' element={<CreatePost />}></Route>
      </Routes>
    </Router>
    
  );
}

export default App;
