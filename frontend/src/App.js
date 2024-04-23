import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Login from "./components/pages/Auth/Login";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Register from "./components/pages/Auth/Register";
import Container from "./components/container/Container";

import { UserContext } from "./context/UserContext";
import UserProfile from "./components/pages/UserProfile/UserProfile";
function App() {
  return (
    <BrowserRouter>
      <UserContext>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/profile" element={<UserProfile />} />
          </Routes>
        </Container>
        <Footer />
      </UserContext>
    </BrowserRouter>
  );
}

export default App;
