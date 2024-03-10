import React from 'react'
import { discount, robot } from '@/assets';
import styles from "../style"
import GetStarted from './Getstarted'
const Hero = () => {
  return (
    <section id='home' className={`flex md:flex-row fle-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <div className='flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2'>
          <img src={discount} alt='discount' className='w-[32px] h-[32px]' />
          <p className={`${styles.paragraph} ml-2`}>
            <span className='text-white' >AutoMobile : </
            span> Car Company, {" "}
            <span className='text-white' >Car</
            span> Services
          </p>
        </div>
        <div className='flex flex-row justify-between items-center w-full'>
          <h1 className='flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100px] leading-[75px]'>AutoMobile<br className='sm:block hidden'/>
          {" "}
          <span className='text-gradient'>
            Company
          </span>{" "}
       
          </h1>
          <div className='ss:flex hidden md:mr-4 mr-0'>
            <GetStarted />
          </div>
        </div>
        <h1 className='flex-1 font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100px] leading-[75px] w-full'> Your Dream Car.</h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Welcome to the future of automotive manufacturing. Our company is designed to revolutionize the production and distribution of cars, ensuring they are built and delivered efficiently to meet the demands of the market.
        </p>

      </div>
      
      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img src={robot} alt='billing' className='w-[100%] h-[100%] relative z-[5]' />
      </div>
      <div className='absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient'></div>
      <div className='absolute z-[1] w-[80%] h-[80%] rounded-full bottom-40 white__gradient'></div>
      <div className='absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient'></div>
    <div className={`ss:hidden ${styles.flexCenter}`}>
      <GetStarted />
    </div>
    </section>
  )
}

export default Hero