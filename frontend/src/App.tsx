import React from 'react';
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import {CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Login from "./features/users/Login";
import FullTourItem from "./features/tours/components/FullTourItem";
import Home from "./features/Home";
import NewDestination from "./features/destiantions/components/NewDestination";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import {useAppSelector} from "./app/hooks";
import {selectUser} from "./features/users/usersSlice";

function App() {
  const user = useAppSelector(selectUser);

  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <main>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/tours/:id" element={<FullTourItem/>}/>
            <Route path="/destinations/new" element={<ProtectedRoute isAllowed={user && user.role == 'admin'}><NewDestination/></ProtectedRoute>}/>
            <Route path="/*" element={<h1 style={{textAlign: 'center'}}>Not Found! This page does not exist!</h1>}/>
          </Routes>
      </main>
    </>
  );
}

export default App;
