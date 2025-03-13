import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Chat from "./components/chat"
import Home from "./components/home"
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/chat" element={<Chat/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
