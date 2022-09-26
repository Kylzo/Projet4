const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const path = require("path");
require('dotenv').config()




mongoose
	.connect(
		process.env.MONGODB_CONNECT_URL,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	res.setHeader("Vary", "Origin");



	next();
});

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, process.env.IMAGE_DIRNAME)));
app.use("/api/posts", postRoutes);
app.use("/api/auth", userRoutes);



module.exports = app;
