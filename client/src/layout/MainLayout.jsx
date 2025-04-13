import Navbar from '@/components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar/>
        <div className='flex-1 mt-16'>
            <Outlet/>  {/*for rendering the children we use <Outlet> jeta react-router-dom theke ase..Children comes from app.jsx*/}
        </div>
    </div>
  )
}

export default MainLayout