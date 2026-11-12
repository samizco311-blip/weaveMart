
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import Login from "./login";
  import Register from "./register";
  import Fabrics from "./fabrics";
  import Profile from "./profile";

  function App(){
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/fabrics" element={<Fabrics/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
      </BrowserRouter>
    )
  }

  export default App