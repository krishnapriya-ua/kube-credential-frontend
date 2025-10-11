import { Link } from "react-router-dom"
import { Button } from "@mui/material"
import TextField from '@mui/material/TextField';
import { useState } from "react";
import axios, {AxiosError} from "axios";
import validator from 'validator'
import { toast } from "react-toastify";
import '../styles/verify.css'

export default function Verification() {
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async() => {
    try {
      if(!validator.isEmail(email)){
          toast.error('Enter valid Email!')
      }
      else{
      const response = await axios.post('http://localhost:5000/verify',{fullname,email})
      if(response.data.success){
        let cred  = response.data.credential
        toast.success(`${response.data.message} as \n Fullname - ${cred.fullname} \n Email - ${cred.email} \n workerId - ${cred.workerId}`)
        console.log(response.data.credential)
      }
      else{
        toast.info(response.data.message)
      }
    }
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        console.log(error, 'Error posting credential');
        const msg = error.response?.data?.message || 'Something went wrong';
        toast.error(msg);
    }
  }

  return (
    <div className="verify-container">
      <div className="verify-card">
        <h3 className="verify-title">Verify Credential</h3>
        <div className="verify-form">
          <TextField variant='standard'  fullWidth label='Fullname' value={fullname} onChange={(e)=>setFullname(e.target.value)} required/> <br />
          <TextField variant="standard" fullWidth label='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/> <br />
          <Button className="verify-btn"  onClick={handleSubmit} variant="contained">Verify Credential</Button>
        </div>
      </div>
        
      <Link className="verify-link" to='/'>Back to Issuance</Link>
    </div>
      
  )
}
