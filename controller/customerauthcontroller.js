import jwt from "jsonwebtoken";
import Customer from "../models/customers.js";


    const generatetokens = (userid) =>{
        const accesstokens = jwt.sign({id: userid},process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '20m'}
        );
        const refreshtoken = jwt.sign({id:userid},process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '7d'}
        );

        return {accesstokens, refreshtoken}
    }

export const register = async (req, resp) =>{
    try{
        const {name, email, password, phone} = req.body;

        const exsistingcustomer =await Customer.findOne({email});
        if(exsistingcustomer){
            return resp.status(400).json({message: "email already regsitered"})
        };

        const newcustomer = await Customer.create({
            name,
            email,
            password,
            phone,
        });

        const {accesstokens, refreshtoken} = generatetokens(newcustomer._id);

        newcustomer.refreshtoken = refreshtoken;
        await newcustomer.save();

        resp.status(201).json({
            message: 'customer registration complete!',
            accesstokens,
            refreshtoken,
            customer:{
                id: newcustomer._id,
                name: newcustomer.name,
                email: newcustomer.email,
                phone: newcustomer.phone
            }
        })



    }catch(error){
    resp.status(500).json({message: error.message})
}
}

export const login = async (req, resp) =>{
    try {
       const {email, password} = req.body;
       const customer = await Customer.findOne({email});
       if(!customer){
        return resp.status(400).json({message: 'invalid email or password'})
       } ;

       const isMatch = await customer.comparePassword(password)
       if(!isMatch){
        return resp.status(401).json({message: 'invalid email or password'});

       };
       const {accesstokens, refreshtoken} = generatetokens(customer._id);

        customer.refreshtoken = refreshtoken;
        await customer.save();

        resp.status(201).json({
            message: 'login successful',
            accesstokens,
            refreshtoken,
            customer:{
                id: customer._id,
                name: customer.name,
                email: customer.email,
                phone: customer.phone
            }
        })

    } catch (error) {
        resp.status(500).json({message: error.message})
    }
}

export const refresh = async (req, res) => { try { const { refreshToken } = req.body; if (!refreshToken) return res.status(401).json({ message: "Refresh token required" });
const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
const customer = await Customer.findById(decoded.id);

if (!customer || customer.refreshToken !== refreshToken) {
  return res.status(403).json({ message: "Invalid refresh token" });
}

const accessToken = jwt.sign({ id: customer._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20m" });
const newRefreshToken = jwt.sign({ id: customer._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

customer.refreshToken = newRefreshToken;
await customer.save();

res.json({ accessToken, refreshToken: newRefreshToken });
} catch (error) { res.status(403).json({ message: "Invalid refresh token" }); } };
export const getProfile = async (req, res) => { res.json(req.customer); };
export const updateProfile = async (req, res) => { try { const customer = await Customer.findById(req.customer._id); if (!customer) return res.status(404).json({ message: "Customer not found" });
customer.name = req.body.name || customer.name;
customer.phone = req.body.phone || customer.phone;

const updated = await customer.save();
res.json({
  id: updated._id,
  name: updated.name,
  email: updated.email,
  phone: updated.phone,
});
} catch (error) { res.status(500).json({ message: error.message }); } };