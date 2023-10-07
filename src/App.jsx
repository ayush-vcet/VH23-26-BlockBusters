import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home/Home';
import Home1 from "./Components/Home1/Home1";
import Hero from "./Components/Hero/Hero";
import Register from "./Components/Register/Register";
import Navbar from "./Components/Navbar/Navbar";
import Verify from "./Components/Verify/Verify";
import Collection from "./Components/Collection/Collection";
import View from "./Components/View/View";
import Admin from "./Components/Admin/Admin";
import { useState } from "react";

function App() {

  const [state, setState] = useState({
    web3: null,
    contract: null,
  });

  const saveState = (state) => {
    console.log(state);
    setState(state);
  };

  return (
    <>
      <BrowserRouter>
      <Navbar saveState={saveState}/>
      <Routes>
        <Route path="/" element={<Hero state={state} />} />
        <Route path="/home" element={<Home1 state={state} />} />
        <Route path="/register" element={<Register state={state} />} />
        <Route path="verify">
          <Route path=":userId" element={<Verify state={state} />} />
        </Route>
        <Route path="view">
          <Route path=":imgId" element={<View />} />
        </Route>
        <Route path="/collection" element={<Collection state={state} />} />
        <Route path="/admin" element={<Admin state={state} />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
