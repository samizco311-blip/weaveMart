    import { useState } from "react";
    import axios from "axios";
    import { useNavigate } from "react-router-dom";
    import './login.css';
    import logo from './img/logo.png'
    import Register from "./register";


        function Login() {
            const [formData, setFormData] = useState({
                email: "",
                password: "",
                });
            const navigate = useNavigate();
        const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value }); };
        
    const handleSubmit = async (e) => { 
        e.preventDefault();
         try {
             const res = await axios.post("http://localhost:5000/api/customers/auth/login", formData);
   
    localStorage.setItem("accessToken", res.data.accesstokens);
    localStorage.setItem("refreshToken", res.data.refreshtoken);

    navigate("/fabrics");
    } catch (error) {
    alert(error.response?.data?.message || "Login failed");
    }
    };
    return ( 
        <div className="body">
    <div className="login-container">
          <form className="loginform" onSubmit={handleSubmit}>
           <img src={logo} alt="weaveemart logo" className="logo" />
             <h2>Login</h2>
             <p>Welcome back to weaveMart</p>
             <input name="email" type="email" placeholder="Enter your Email" onChange={handleChange} required /><br /><br />
              <input name="password" type="password" placeholder="Enter Password" onChange={handleChange} required /><br /><br /> 
              <button type="submit">Login</button><br /> 
              <div className="link">
              {Register && <p>Don't have an account? <a href="/register">Register</a></p>}
              </div>
              </form>
               </div> 
               </div>
               );
               }



    export default Login;