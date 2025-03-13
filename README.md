---

# **📩 Real-Time Chat Application**  

A real-time chat application built using **React, Express, and Socket.io**. It supports multiple users, room-based chatting, and live updates.

## **⚡ Features**
- 🔹 Real-time messaging with **Socket.io**
- 🔹 Multiple chat rooms  
- 🔹 User join/leave notifications  
- 🔹 Responsive UI  
- 🔹 Auto-scroll to the latest messages  
- 🔹 Display active users in the room  

---

## **📂 Project Structure**
```
/chat-app
│── /client  (Frontend - React)
│── /server  (Backend - Express + Socket.io)
│── README.md
│── package.json
```

---

## **🚀 Technologies Used**
### **Frontend:**
- React.js (Vite)
- Socket.io-client
- React Router
- CSS for styling

### **Backend:**
- Node.js  
- Express.js  
- Socket.io  
- CORS  

---

## **🛠️ Installation & Setup**
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

### **2️⃣ Install Dependencies**
#### **For Backend (Server)**
```bash
cd server
npm install
```

#### **For Frontend (Client)**
```bash
cd ../client
npm install
```

### **3️⃣ Run the Server**
```bash
cd server
node index.js
```

### **4️⃣ Run the Frontend**
```bash
cd ../client
npm run dev
```

The frontend will start at **`http://localhost:5173/`**.

---

## **📡 Connecting on Mobile**
If you want to access the chat from a mobile device, make sure:
1. Your backend is running on **your local network IP** (e.g., `192.168.1.100`).
2. Update the frontend **socket connection**:
   ```js
   const socket = io("http://192.168.1.100:3000", {
       transports: ["websocket", "polling"]
   });
   ```
3. Use **port forwarding** in VS Code or directly access via the local IP.

## **📸 Screenshots**

![image](https://github.com/user-attachments/assets/c18fcac1-d841-4bbe-8792-e32616229d93) ![image](https://github.com/user-attachments/assets/938441c7-4a79-4c87-a9cc-4fc105a42554)
![image](https://github.com/user-attachments/assets/8cc1b769-c0a9-4a1f-9d6e-4bf0d427a2b1)


---

## **🤝 Contribution**
Want to improve this project? Fork it, make changes, and create a pull request! 🎉  

---

## **📜 License**
This project is **open-source** and available under the **MIT License**.

---
