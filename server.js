const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("practices"));

// MongoDB Connection
mongoose.connect("mongodb+srv://ranny:ranny123@cluster0.bomnn.mongodb.net/locker")
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

// Define a model for your collection
const Locker = mongoose.model('Locker', new mongoose.Schema({
    Unit: String,
    Model: String,
    Price: Number,
    Details: String,
    ImageBase64: String,
}, { collection: 'locker_db' }));


// Schema Definitions
const userSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Rfid_tags: String,
    Contact_No: String,
    Locker_Unit: String,
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Address: String,
});

const User = mongoose.model("User", userSchema);

// Registration Endpoint
app.post("/client_form", async (req, res) => {
    const { name,  contact_No,  email, password, address } = req.body;

    if (!name ||   !contact_No ||   !email || !password || !address) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        Name: name,
        Contact_No: contact_No,
        Email: email,
        Password: hashedPassword,
        Address: address,
    });

    try {
        await newUser.save();
        res.status(201).json({ message: "User registered successfully! Please log in." });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "This email is already registered." });
        }
        console.error("Error inserting data:", error);
        return res.status(500).json({ error: "Error inserting data." });
    }
});

// Login Endpoint
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and Password are required." });
    }

    try {
        const user = await User.findOne({ Email: email });

        if (!user || !(await bcrypt.compare(password, user.Password))) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        res.json({ message: "Login successful!", redirectUrl: "/home" });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: "Error logging in." });
    }
});

// API endpoint to fetch data
app.get('/api/lockers', async (req, res) => {
    try {
        const lockers = await Locker.find({});
        res.json(lockers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/home", (req, res) => {
    res.set({ "Allow-access-Allow-Origin": "*" });
    return res.sendFile(__dirname + "/practices/home.html");
});


app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});
