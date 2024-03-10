import React from 'react'
import {  logo } from '@/assets'
import { navLinks } from '../constants'

const Navbar = () => {

 
  
  return (
    <nav className='w-full flex py-6 justify-between items-center navbar'>
      <img src={logo} alt="drugStore" className='w-[124px]  h-[32px]' />
      
        <ul className='list-none sm:flex hidden justify-end items-center flex-1'>

          {navLinks.map((nav, index) => (
            <li key={nav.id}
              className={` z-10 font-poppins font-normal cursor-pointer text-[16px] text-white ${index === navLinks.length - 1 ? 'mr-0' : 'mr-20'}`}>

              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>

          )
          )}
        </ul>
     
    
    </nav>
  )
}

export default Navbar