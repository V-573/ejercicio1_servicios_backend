import { env } from "./config/env.config.js";
import express from "express";
import app from "./app.js";




const PORT = parseInt(env.PORT, 10) || 3000;

app.listen(PORT, ()=>{
  console.log(`servidor corriendo exitosamente en http://localhost:${PORT}`)   
})
