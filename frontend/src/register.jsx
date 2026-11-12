import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './register.css';
import logo from './img/logo.png';





function Register(){
    const [formdata, setformdata] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
    })
    const navigate = useNavigate();

    const handleChange = (e) =>{
        setformdata ({ ...formdata, [e.target.name]: e.target.value});
    };
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/customers/auth/register", formdata);
            console.log(res.data);
            alert("Registration successful!");


            navigate("/login");
        } catch (error) {
            console.log(error.response?.data);
            alert(error.response?.data?.message || "Registration failed");
        }
    }
    return(
        <div className="body2">
        <div className="login-container2">
            <form className="loginform2" onSubmit={handleSubmit}>
                 <img src={logo} alt="weaveemart logo" className="logo2" />
                             <h2>Register</h2>
                <input name="name" placeholder="full name" onChange={handleChange} required /><br /><br />
                <input name="email" placeholder="email address" onChange={handleChange} required /><br /><br />
                <input name="password" placeholder="input password" onChange={handleChange} required /><br /><br />
                <input name="phone" placeholder="phone number" onChange={handleChange} required /><br /><br />
                <button type="submit">Register</button>
            </form>

        </div>
        </div>
    )
}
export default Register;