import React from 'react';
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import {Container, CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Login from "./features/users/Login";
import Tours from "./features/tours/Tours";
import FullTourItem from "./features/tours/components/FullTourItem";

function App() {
  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Tours/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/tours/:id" element={<FullTourItem/>}/>
            <Route path="/*" element={<h1>Not Found! This page does not exist!</h1>}/>
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
