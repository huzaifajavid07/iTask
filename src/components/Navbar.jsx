import React from 'react'

const Navbar = () => {
    return (
        <>
            <nav className='flex justify-around bg-violet-900 text-white py-2'>
                <div className="logo flex items-center gap-3">
                    <img src="/svg.png" className="h-8" alt="Flowbite Logo" />
                    <span className='font-bold text-xl'>iTask</span>
                </div>
                <ul className="flex gap-8 mx-9">
                    <li className='cursor-pointer hover:font-bold transition-all min-w-[60px] text-center'>Home</li>
                    <li className='cursor-pointer hover:font-bold transition-all min-w-[80px] text-center'>Your Task</li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar
