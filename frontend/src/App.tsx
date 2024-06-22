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
import NewTour from "./features/tours/components/NewTour";
import EditTour from "./features/tours/components/EditTour";
import EditDestination from "./features/destiantions/components/EditDestination";
import ToursPage from "./features/tours/ToursPage";
import NotificationsAdmin from "./features/notifications/NotificationsAdmin";

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
            <Route path="/tours" element={<ToursPage/>}/>
            <Route path="/destinations/new" element={<ProtectedRoute isAllowed={user && user.role == 'admin'}><NewDestination/></ProtectedRoute>}/>
            <Route path="/destinations/edit/:id" element={<ProtectedRoute isAllowed={user && user.role == 'admin'}><EditDestination/></ProtectedRoute>}/>
            <Route path="/tours/new" element={<ProtectedRoute isAllowed={user && user.role == 'admin'}><NewTour/></ProtectedRoute>}/>
            <Route path="/tours/edit/:id" element={<ProtectedRoute isAllowed={user && user.role == 'admin'}><EditTour/></ProtectedRoute>}/>
            <Route path="/admin/notifications" element={<ProtectedRoute isAllowed={user && user.role == 'admin'}><NotificationsAdmin/></ProtectedRoute>}/>
            <Route path="/*" element={<h1 style={{textAlign: 'center'}}>Not Found! This page does not exist!</h1>}/>
          </Routes>
      </main>
    </>
  );
}

export default App;
