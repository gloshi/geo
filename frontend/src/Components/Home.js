import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import Map1 from './Map1';

export default function Home() {

    const history = useHistory()
    const [name,setName] = useState('')
    const [allMaps, setAllMaps] = useState([])


    let message=''

    const addName=()=>{
        axios.post('http://localhost:2000/api/addName',{name:name})
        .then(response=>{
            if(response){
                message = response.data.msg
                history.push(`/map/${name}`)
            }
        })
        .catch(err=>console.log(err))

    }


    const getAllMaps = () => {
        axios.get('http://localhost:2000/api/getAllMaps')
        .then(response=>{
            if(response){
                setAllMaps(response.data)
            }
        })
        .catch(err=>console.log(err))
    }

    useEffect(() => {
        let unmounted = false
        setTimeout(() => {
            getAllMaps()
        }, 1000);
        return ()=> {unmounted=true}
    },[])


  return (
    <div>
        <div style={{marginTop:'10px'}}></div><br/>
        <input type="text" placeholder="Search..." onChange={(e)=>setName(e.target.value)} value={name} className="searchtext"/>&nbsp;
        <Button variant="dark" className="searchbtn" disabled={name === "" ? true : false} onClick={addName}>Добавить</Button>
        <br />
          <h3>Спискок карт</h3>
          <div>
              <Table strited bordered hover>
                  <thead>
                      <tr>
                    <th>ID</th>
                    <th>Place</th>
                    <th>actions</th>
                    </tr> 
                  </thead>
                  <tbody>
                     
                          {
                              allMaps.map(map=> <Map1 key={map.id} name={map.name} map={map} /> )
                          }
                        
                  </tbody>
              </Table>
          </div>

    </div>
  )
}
