import Fabric from "../models/fabric.js";


export const createFabric = async (req, res) => { 
    try {
         const fabric = await Fabric.create(req.body); res.status(201).json(fabric); 
        } catch (error) { 
            res.status(500).json({ message: error.message });
         } 
        };
export const getFabrics = async (req, res) => {
     try {
         const { name, material, color, tier, minPrice, maxPrice, inStock } = req.query; let filter = {};
     if (name) filter.name = {
     $regex: name, $options: "i"
     };
     if (material) filter.material = {
     $regex: material, $options: "i"
     };
     if (color) filter.color = {
     $regex: color, $options: "i" 
    };
     if (tier) filter.tier = tier;
     if (inStock !== undefined) filter.inStock = inStock === "true";

if (minPrice || maxPrice) {
  filter.price = {};
  if (minPrice) filter.price.$gte = Number(minPrice);
  if (maxPrice) filter.price.$lte = Number(maxPrice);
}

const fabrics = await Fabric.find(filter);
res.json(fabrics);
} catch (error) { res.status(500).json({ message: error.message }); } };
export const getFabricById = async (req, res) => { try { const fabric = await Fabric.findById(req.params.id); if (!fabric) return res.status(404).json({ message: "Fabric not found" }); res.json(fabric); } catch (error) { res.status(500).json({ message: error.message }); } };