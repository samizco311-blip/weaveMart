import { useEffect, useState } from "react";
import axios from "axios";
import './fabrics.css';
import logo from './img/logo.png'
import profile from './img/profile.jpg'
import Profile from "./profile";

function Fabrics() {
  const [fabrics, setFabrics] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    material: "",
    color: "",
    tier: "",
    minPrice: "",
    maxPrice: "",
    inStock: "",
  });

  const fetchFabrics = async () => {
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach((key) => {
        if (filters[key]) params.append(key, filters[key]);
      });

      const res = await axios.get(`https://weavemart.onrender.com/api/fabrics?${params}`);
      setFabrics(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFabrics();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div>
        <div className="navbar">
        <img src={logo} alt="" className="nav-logo"/>

        {Profile && <a href="/Profile">
        <img src={profile} alt="" className="nav-profile" />
        </a>}
        </div>
    <div className="filter-box">
      <div style={{ width: "250px" }} className="filter-container">
        <h3>Filters</h3>

        <input
          name="name"
          placeholder="Search by name"
          value={filters.name}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <h3>Materials</h3>
        <input
          name="material"
          placeholder="Material"
          value={filters.material}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <h3>Colors</h3>
        <input
          name="color"
          placeholder="Color"
          value={filters.color}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <h3>Tier</h3>
        <select
          name="tier"
          value={filters.tier}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        >
          <option value="">All Tiers</option>
          <option value="Basic">Basic</option>
          <option value="Premium">Premium</option>
          <option value="Luxury">Luxury</option>
        </select>

        <h3>Price range</h3>
        <input
          name="minPrice"
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <input
          name="maxPrice"
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "15px", padding: "8px" }}
        />

        <button onClick={fetchFabrics} style={{ width: "100%", padding: "10px", background: "#6B46C1", color: "white", border: "none", borderRadius: "5px" }}>
          Apply Filters
        </button>
      </div>

      {/* Fabrics Grid */}
      <div style={{ flex: 1 }} className="fabic-grid">
        <h2>All Fabrics</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
          {fabrics.map((fabric) => (
            <div key={fabric._id} style={{ border: "1px solid #eee", borderRadius: "10px", padding: "15px", background: "white" }}>
              <div style={{ height: "140px", background: "#f3f3f3", borderRadius: "8px", marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#999" }}>
                Fabric Image
              </div>
              <h4 style={{ margin: "0 0 5px" }}>{fabric.name}</h4>
              <p style={{ margin: "0", color: "#666", fontSize: "14px" }}>
                {fabric.material} • {fabric.color}
              </p>
              <p style={{ fontWeight: "bold", margin: "8px 0" }}>₦{fabric.price.toLocaleString()}</p>
              <span style={{ fontSize: "12px", background: "#6B46C1", color: "white", padding: "3px 8px", borderRadius: "10px" }}>
                {fabric.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}

export default Fabrics;