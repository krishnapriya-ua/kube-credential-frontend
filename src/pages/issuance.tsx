
import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import TextField from '@mui/material/TextField';
import { useState } from "react";
import axios,{AxiosError} from "axios";
import validator from 'validator'
import { toast } from "react-toastify";

export default function Issuance() {
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async() => {
    try {
      if(!validator.isEmail(email)){
          toast.error('Enter valid Email!')
      }
      else{
      if(fullname.trim()!=='' && email.trim()!==''){
        const response = await axios.post('http://localhost:3000/issue',{fullname,email})
        if(response.data.success){
          toast.success(response.data.message)
          console.log(response.data.Credentials,'Credentials created from back to front')
          setFullname('')
          setEmail('')
        }
        else{
          toast.info(response.data.message)
        }
      }
      else{
        toast.error('All fields are necessary!!')
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
    <div>
        <div className="verify-container">    
            <div className="verify-card">
               <h3 className="verify-title">Issue Credential</h3>
                <form className="verify-form">
                   <TextField variant='standard'  fullWidth label='Fullname' value={fullname} onChange={(e)=>setFullname(e.target.value)} required/> <br />
                   <TextField variant="standard"  fullWidth label='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/> <br />
                   <Button className="verify-btn" style={{background:'black'}} onClick={handleSubmit} variant="contained">Issue Credential</Button>
                </form>
            </div>
            <Link className="verify-link" to='/verification'>Verification</Link>
        </div>
    </div>
  )
}
