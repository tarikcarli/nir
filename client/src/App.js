import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Register from "./pages/register";

function App({ user }) {
  return (
    <div className="flex flex-col h-full w-full bg-gray-100 text-gray-900">
      <Navbar user={user} />
      <Routes>
        <Route path="/landing" element={<Landing />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

// @ts-ignore
export default connect((state) => ({ user: state.nir.user }))(App);
