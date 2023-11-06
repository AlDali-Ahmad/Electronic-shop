import React from 'react';
import Nav from './comp/nav';
import { BrowserRouter } from 'react-router-dom';
import Footer from './comp/footer';
import Rout from './rout';

function App() {
  return (
    <>
      <BrowserRouter>
      <Nav/>
      <Rout/>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
