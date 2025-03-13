const express = require("express")
const http = require("http")
const {Server} = require("socket.io")
const cors = require("cors")

const app=express();
//join the app and http
const server = http.createServer(app);
//join the server with socket
const io = new Server(server,{
    // cors:{
    //     origin: "http://localhost:5173"
    // }
})

app.use(cors());
app.use(express.json())

let rooms={}

io.on("connection",(socket)=>{
    console.log("New user Connected",socket.id)

    //handle room joining
    socket.on("join_room",({username, room})=>{
        socket.join(room);
        if(!rooms[room]){
            rooms[room]=[]
        }

        rooms[room].push({id:socket.id, username});
        console.log("the rooms data",rooms[room])
        io.to(room).emit("room_users",{users: rooms[room]})
        console.log(`${username} joined room: ${room}`)
    })

    //handling send message
    // data={username, room, time, message}
    socket.on("send_message",(data)=>{
        console.log("the messages data",data)
        // if(rooms[data.room]){
        //     rooms[data.room].push(data)
        // }
        io.to(data.room).emit("receive_messages",data);
    })

    //handling leave room
    socket.on("leave_room",({username,room})=>{
        socket.leave(room);
        if(rooms[room]){
            rooms[room]=rooms[room].filter((user)=>user.id !== socket.id)
            io.to(room).emit("room_users",{users:rooms[room]})
        }

        console.log(`${username} left the room: ${room}`)
    })

    //handling disconnection
    socket.on("disconnect",()=>{
        for(const room in rooms){
            rooms[room]=rooms[room].filter(user=>user.id !== socket.id)
            io.to(room).emit("room_users",socket.id)
        }
        console.log('User disconnected:', socket.id);
    })
})

server.listen(3000,"0.0.0.0",()=>{
    console.log("server running on port 3000")
})