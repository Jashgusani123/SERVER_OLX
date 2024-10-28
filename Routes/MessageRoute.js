import express from "express";
import { sendMessage, getAllMessages } from "../Controller/MessageController.js"; // Adjust the path

const app = express()

app.post("/send", sendMessage); // Route for sending a message
app.get("/:chatId", getAllMessages); // Route for retrieving messages

export default app;
