import { useState } from "react";
import "./home.css"
import { useNavigate } from "react-router-dom";

function Home(){
    const [username, setUsername] = useState("");
    const [room,setRoom] =useState("general");
    const navigate = useNavigate();

    const joinRoom=()=>{
        if(username.trim() && room){
            navigate("/chat",{state:{username,room}});
        }
    };

    return (
        <div className="home-container">
            <h1>Join a Chat Room</h1>
            <div className="form-group">
                <label>Username</label>
                <input 
                    type="text"
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                    placeholder="Enter your username"
                />  
            </div>
            <div className="form-group">
                <label>Room</label>
                <select value={room} onChange={(e)=>{setRoom(e.target.value)}}>
                    <option value="general">General</option>
                    <option value="technology">Technology</option>
                    <option value="gaming">Gaming</option>
                </select>
            </div>
            <button onClick={joinRoom}>Join Room</button>
        </div>
    )
}

export default Home;