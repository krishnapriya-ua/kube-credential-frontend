
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Issuance from "./issuance"
import Verification from "./verification"
function App() {
  
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Issuance/>}/>
      <Route path="/verification" element={<Verification/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
