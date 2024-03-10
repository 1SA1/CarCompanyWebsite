import { Link, Head } from '@inertiajs/react';
import React from 'react'
import ReactDOM from 'react-dom/client'
import '../index.css'
import { logo } from '@/assets'
import styles from "../style";
import { navLinks } from '../constants'
import { Billing, Business, CardDeal, Clients, CTA, Footer, Stats, Testimonials, Hero, DisplayCars } from "../componentsTempaltes";

export default function Welcome({ auth }) {
    return (
        <>


            <div className="bg-primary w-full overflow-hidden">

                <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidth}`}>
                        <nav className='w-full flex py-6 justify-between items-center navbar'>
                            <img src={logo} alt="drugStore" className='w-[124px] h-[32px]' />

                            <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
                                {navLinks.map((nav, index) => (
                                    <li key={nav.id} className={`z-10 font-poppins font-normal cursor-pointer text-[16px] text-white ${index === navLinks.length - 1 ? 'mr-0' : 'mr-20'}`}>
                                        
                                        <a href={`#${nav.id}`}>{nav.title}</a>
                                    </li>
                                ))}
                                {auth.user ? (
                                    <li>
                                        <Link href={route('dashboard')} passHref>
                                            <a className=" ml-20 py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ">
                                                Dashboard
                                            </a>
                                        </Link>

                                    </li>
                                ) : (
                                    <div>
                                        <li>
                                            <Link href={route('login')}  >
                                                <a className=" ml-5 py-2 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ">
                                                Log in
                                                </a>
                                            </Link>
                                        </li>
                                    </div>
                                )}
                            </ul>
                        </nav>

                   

                    </div>
                </div>

                <div className={`bg-primary ${styles.flexStart}`}>
                    <div className={`${styles.boxWidth}`}>
                        <Hero />
                    </div>
                </div>

                <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidth}`}>
                        <DisplayCars />
                        <Stats />
                        <Business />
                        <Billing />
                        <CardDeal />
                        <Testimonials />
                        <Clients />
                        <CTA />
                        <Footer />
                    </div>
                </div>
            </div>



            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </>
    );
}
