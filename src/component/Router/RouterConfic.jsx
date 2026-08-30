import React from 'react'
import {Route,Routes} from "react-router-dom"
import Navbar from '../Navbar'
import { RouterPage } from './Routes'

export default function RouterConfic() {
  return (
    <div>
        <Routes>
            {
                RouterPage.map((data)=>{
                    return(
                        <>
                        <Route key={data.key} element={<Navbar/>}/>
                        <Route path={data.route} element={data.Component}/>
                        </>
                    )
                })
            }
        </Routes>
    </div>
  )
}
