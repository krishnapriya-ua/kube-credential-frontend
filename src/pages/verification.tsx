import { Link } from "react-router-dom"
import { Button } from "@mui/material"
import TextField from '@mui/material/TextField';
import { useState } from "react";
import axios, {AxiosError} from "axios";


export default function Verification() {
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async() => {
    try {
      const response = await axios.post('http://localhost:5000/verify',{fullname,email})
      if(response.data.success){
        let cred  = response.data.credential
        alert(`${response.data.message} as \n Fullname - ${cred.fullname} \n Email - ${cred.email} \n workerId - ${cred.workerId}`)
        console.log(response.data.credential)
      }
      else{
        alert(response.data.message)
      }
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        console.log(error, 'Error posting credential');
        const msg = error.response?.data?.message || 'Something went wrong';
        alert(msg);
    }
  }

  return (
    <div>
      <div className="container m-5">
        <div className="form text-center">
          <TextField variant='standard' className="mb-2" fullWidth label='Fullname' value={fullname} onChange={(e)=>setFullname(e.target.value)} required/> <br />
          <TextField variant="standard"  className="mb-2" fullWidth label='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/> <br />
          <Button className="my-3 text-center" style={{background:'black'}} onClick={handleSubmit} variant="contained">Verify Credential</Button>
        </div>
      </div>
        
        <Button><Link to='/'>Issuance</Link></Button>
    </div>
      
  )
}
