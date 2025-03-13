import { useLocation, useNavigate } from "react-router-dom";
import {socket} from "../socket"
import { useEffect, useRef, useState } from "react";
import "./chat.css"

function Chat(){
    const location = useLocation();
    const navigate = useNavigate();
    const {username, room}= location.state || {};
    const [message,setMessage]=useState("");
    const [messages,setMessages]=useState([]);
    const [users,setUsers]=useState([]);
    const chatContainerRef = useRef(null);

    useEffect(()=>{
        if(!username || !room){
            navigate("/")
            return;
        }

        //join specific room
        socket.emit("join_room",{username, room})
        
        //listening for messages in room
        socket.on("receive_messages",(data)=>{
            //when user first time enter chat reload all previous mess
            setMessages(prev=>([...prev,data]))
        })

        //listen for users on room
        socket.on("room_users",(data)=>{
            console.log("User data fetching...",data)
            setUsers(data.users)
        })

        if(chatContainerRef.current){
            chatContainerRef.current.scrollTop=chatContainerRef.current.scrollHeight;
        }

        //V.V.V Imp
        return ()=>{
            //leave the room
            socket.emit("leave_room",{username,room})
            //turn off the socket eventListner
            socket.off("receive_messages")
            socket.off("room_users")
        }

    },[username,room,navigate,messages])



    const sendMessage=()=>{
        if(message.trim()){
            const messageData={
                room,
                username,
                message,
                time:new Date().toLocaleTimeString()
            }
            socket.emit("send_message",messageData)
            setMessage("");
        }
    }

    return (
        <div className="chat-container">
            <div className="chat-sidebar">
                <h2>Room: {room}</h2>
                <h3>Users</h3>
                <ul>
                    {users.map((user,index)=>
                        <li key={index}>{user.username}</li>
                    )}
                </ul>
            </div>
            <div className="chat-main">
                <div className="chat-header">
                    <button onClick={()=>navigate("/")}>Leave</button>
                </div>
                <div className="chat-messages" ref={chatContainerRef}>
                    {messages.map((msg,index)=>
                        <div 
                            key={index}
                            className={`message ${msg.username === username ? "sent":"received"}`}
                        >
                            <p>{msg.message}</p>
                            <span>{msg.username} • {msg.time}</span>
                        </div>
                    )}
                </div>
                <div className="chat-input">
                    <input type="text" 
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                        onKeyDown={(e)=> e.key==="Enter" && sendMessage()}
                        placeholder="Type a message..."
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat;