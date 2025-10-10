
import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import TextField from '@mui/material/TextField';
import { useState } from "react";
import axios,{AxiosError} from "axios";

export default function Issuance() {
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async() => {
    try {
      if(fullname.trim()!=='' && email.trim()!==''){
        const response = await axios.post('http://localhost:3000/issue',{fullname,email})
        if(response.data.success){
          alert(response.data.message)
          console.log(response.data.Credentials,'Credentials created from back to front')
          setFullname('')
          setEmail('')
        }
        else{
          alert(response.data.message)
        }
      }
      else{
        alert('All fields are necessary!!')
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
        <div className="container">    
            <div className="m-5">
                <form className="text-center">
                   <TextField variant='standard' className="mb-2" fullWidth label='Fullname' value={fullname} onChange={(e)=>setFullname(e.target.value)} required/> <br />
                   <TextField variant="standard"  className="mb-2" fullWidth label='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/> <br />
                   <Button className="my-3 text-center" style={{background:'black'}} onClick={handleSubmit} variant="contained">Issue Credential</Button>
                </form>
            </div>
            <Button><Link to='/verification'>Verification</Link></Button>
        </div>
    </div>
  )
}
