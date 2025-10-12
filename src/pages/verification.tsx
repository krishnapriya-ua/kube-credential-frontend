import { Link } from "react-router-dom"
import { Button } from "@mui/material"
import TextField from '@mui/material/TextField';
import { useState  } from "react";
import axios, {AxiosError} from "axios";
import validator from 'validator'
import { toast } from "react-toastify";
import '../styles/verify.css'
const VERIFICATION_BACKEND_URL = import.meta.env.VITE_VERIFICATION_BACKEND_URL
import Swal from 'sweetalert2'


export default function Verification() {
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async(e :any) => {
    e.preventDefault()
    try {
      if(!validator.isEmail(email)){
          toast.error('Enter valid Email!')
      }
      else{
      const response = await axios.post(`${VERIFICATION_BACKEND_URL}/verify`,{fullname,email})
      if(response.data.success){

        let cred  = response.data.credential
         Swal.fire({
            title:'Verified',
            html:`${response.data.message} as <br>  Fullname : ${cred.fullname} <br> Email : ${cred.email} <br> workerId : ${cred.workerId} <br> Issued at : ${cred.issuedAt}`,
            icon:'success'
          })
        // toast.success(`${response.data.message} as \n Fullname - ${cred.fullname} \n Email - ${cred.email} \n workerId - ${cred.workerId}`)
        console.log(response.data.credential)
        setFullname('')
        setEmail('')
      }
      else{
        Swal.fire({
          title:'Error',
          text:response.data.message,
          icon:'error'
        })
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
        <form className="verify-form form">
          <TextField variant='standard'  fullWidth label='Fullname' value={fullname} onChange={(e)=>setFullname(e.target.value)} required/> <br />
          <TextField variant="standard" fullWidth label='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/> <br />
          <Button type="submit" onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }} className="verify-btn"  onClick={handleSubmit} variant="contained">Verify Credential</Button>
        </form>
      </div>
        
      <Link className="verify-link" to='/'>Back to Issuance</Link>
    </div>
      
  )
}
