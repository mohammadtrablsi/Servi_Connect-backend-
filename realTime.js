/*import http from "http";
import express from "express";
import {Server} from "socket.io";
import { Socket } from "dgram";
*/




const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const { Socket } = require("dgram");
const router = express.Router();
const { verifyToken } = require("./middlewares/verifyToken");
const dotenv = require("dotenv");

dotenv.config();



const app=express();
const server=http.createServer(app);
const io = new Server(server);

const userSockets=new Map();


io.on("connection",(socket)=>{
  console.log('connected: ');
  console.log(socket.id);

  socket.on("user-join",(data)=>{
     userSockets.set(data,socket.id);
     io.to(socket.Id).emit('session-join',"your session has bn started");
  });

  socket.on("disconnect",()=>{
    for(let[userId,socketId]of userSockets.entries()){
        if(socketId==socket.id){
            userSockets.delete(userId);
            break;
        }
    }
 });
});

app.use(express.json());
router
  .route("/").post(verifyToken,(req,res)=>{
    const userId=req.body.userId;
    if(!userId){
        return res.status(400).json({success:false,message:'user Id required'});
    }

    const socketId=userSockets.get(userId);
    if(socketId){
        io.to(socketId).emit('session-expired',{messanger:req.user.id,text:req.body.text});
        return res.status(200).json({success:true,message:"logged out successfully"});
    }else{
        return res.status(400).json({success:false,message:"no active session found"});
    }
});
app.use('/api/socket',router);

server.listen(3500,()=>{
  console.log("server started on port 3500");  
});