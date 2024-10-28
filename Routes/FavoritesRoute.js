import express from 'express'
import { GetAllUserFavorite, createFavorite, removeFromFavorite, viewdetails } from '../Controller/FavoritesController.js';
import { isAuthenticated } from '../Functions/isAuthentication.js';

const app = express();

app.post("/create" , isAuthenticated , createFavorite)
app.post("/removeitem" , isAuthenticated, removeFromFavorite)
app.get("/getfavorite" , isAuthenticated, GetAllUserFavorite)
app.post("/viewdetails" , viewdetails)

export default app;