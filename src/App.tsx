
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Issuance from "./pages/issuance"
import Verification from "./pages/verification"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Issuance/>}/>
      <Route path="/verification" element={<Verification/>}/>
     </Routes>
     <ToastContainer/>
     </BrowserRouter>
    </>
  )
}

export default App
