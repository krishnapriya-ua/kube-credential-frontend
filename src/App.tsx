
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Issuance from "./pages/issuance"
import Verification from "./pages/verification"
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
