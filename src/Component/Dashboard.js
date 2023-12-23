import React, { useState } from 'react';
import Customerdata from './Customerdata';
import Mapgis from './Map';
import{useNavigate} from "react-router-dom"


function Dashboard() {

    const navigate = useNavigate();

     const [Active, setActive] = useState(false)
     //const [Parent, setParent] = useState(true)
     const [ message, setMessage] = useState({
        lati:"",
        lng:""
     })
    const HandlePC = (lat,lng,jobid)=>{
        console.log("hitted")
        // setMessage({
        //     lati:lat,
        //     lng:long
        // })
        // setActive(true)
        //setParent(false)
                  navigate('/map', {state:{lat,lng,jobid}})
       

    }

  return (
    <>
   
      <div> 
        <h1><b><center>MY Job</center></b></h1>
        <table class="table table-striped table-dark table-hover">
  <thead>
    <tr>
      <th> JOB ID</th>
      <th>Customer</th>
      <th>Latitude</th>
      <th>Longitude</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
  {
    Customerdata.map((item,index)=>{
     return <tr>
      <td>{item.Job_ID}</td>
      <td>{item.PC}</td>
      <td>{item.lat}</td>
      <td>{item.lng}</td>
      <td><button onClick={()=>{HandlePC(item.lat,item.lng,item.Job_ID)}}>Start</button></td>
    </tr>
    })
  }
  </tbody>
        </table>
       
    </div> 
    {/* <div>
            {
                Active && <Mapgis data={message}/>
            }
        </div> */}
    </>
  )
}

export default Dashboard