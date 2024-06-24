// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartItemProvider } from './context/CartItemContext'; // Import CartItemProvider
import Nav from "./components/Nav";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import Tea from "./pages/Tea";
import Cart from "./pages/Cart";
import Frappuccino from "./pages/Frappuccino";
import Coffee from "./pages/Coffee";
import Blended from "./pages/Blended";
import Search from "./pages/Search";
import Admin from "./pages/Admin";

function App() {
    return (
        <AuthProvider>
            <CartItemProvider>
                <Router>
                    <div>
                        <Nav />
                        <Routes>
                            <Route path="/tea" element={<Tea />} />
                            <Route path="/coffee" element={<Coffee />} />
                            <Route path="/" element={<Home />} />
                            <Route path="/mypage" element={<MyPage />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/frappuccino" element={<Frappuccino />} />
                            <Route path="/blended" element={<Blended />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/admin" element={<Admin />} />
                        </Routes>
                    </div>
                </Router>
            </CartItemProvider>
        </AuthProvider>
    );
}

export default App;
