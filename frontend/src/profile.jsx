import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/customers/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        "https://weavemart.onrender.com/api/customers/me",
        { name: profile.name, phone: profile.phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Profile updated successfully");
      setProfile(res.data);
    } catch (error) {
      setMessage("Failed to update profile");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "80px auto", padding: "20px" }} >
      <h2>My Profile</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleUpdate}>
        <label>Name</label>
        <input name="name" value={profile.name || ""} onChange={handleChange} />

        <label>Email (cannot change)</label>
        <input name="email" value={profile.email || ""} disabled />

        <label>Phone</label>
        <input name="phone" value={profile.phone || ""} onChange={handleChange} />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;