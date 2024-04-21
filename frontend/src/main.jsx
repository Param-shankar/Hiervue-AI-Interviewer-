import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './App.css'
import './Components/style.css'
import ChatContainer from './Components/chat'
import {
  createBrowserRouter,
  RouterProvider,
  Route,  
  createRoutesFromElements,
} from "react-router-dom";
import InterviewScheduler from './Components'
import Dictaphone1 from './Components/Dict'
  
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={< InterviewScheduler/>} />
      <Route path="interview" element={<ChatContainer />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);
