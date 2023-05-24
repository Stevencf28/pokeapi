import fetch from "node-fetch";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();
const app = express();
const port = 3001;
const configuration = new Configuration({
	apiKey: process.env.AUTH_KEY,
});

app.use(cors());

app.get("/", (req, res) => {
	res.send("Hello Get!");
});

app.get("/pokemon/:id", async (req, res) => {
	const id = req.params.id;
	const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
	const data = await response.json();

	const openai = new OpenAIApi(configuration);
	const aiResponse = await openai.createImage({
		prompt: data.name + " from pokemon",
		n: 1,
		size: "256x256",
		response_format: "url",
	});

	const pokemon = {
		id: data.id,
		name: data.name,
		imageUrl: aiResponse.data.data[0].url,
	};

	res.status(200).json(pokemon);
});

app.post("/", (req, res) => {
	res.send("Hello Post...");
});

app.put("/user/${id}", (req, res) => {
	res.send("Hello Put...");
});

app.delete("/user/${id}", (req, res) => {
	res.send("Hello Delete...");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
