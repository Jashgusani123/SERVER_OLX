import express from 'express'
import { GetAllChats, StartChatting } from '../Controller/ChatController.js';
import { isAuthenticated } from '../Functions/isAuthentication.js';

const app = express()

app.post("/startchat" , isAuthenticated , StartChatting)
app.get("/getallchats" , isAuthenticated , GetAllChats)

export default app ;