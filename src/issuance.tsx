
import { Button } from "@mui/material"
import { Link } from "react-router-dom"
// import TextField from "@mui/material"

export default function Issuance() {
  return (
    <div>
        <div className="row">
           
            <div className="">
                <form action="">
                   {/* <TextField variant='standard'/> */}
                    <Button>hello</Button>
                </form>
            </div>
            <Button><Link to='/verification'>Verification</Link></Button>
        </div>
    </div>
  )
}
