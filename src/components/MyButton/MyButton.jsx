import React from 'react'

export default function MyButton({children, ...props}) {
    return (
        <button 
        {...props}
        className="                      
        mx-auto
        lg:mx-0
        text-white
        rounded-md
        bg-green-450
        my-6
        py-4
        px-8
        shadow-lg
        text-2xl
        focus:outline-none 
        focus:shadow-outline
        transform
        transition
        hover:scale-105
        duration-300
        ease-in-out"
        >
            {children}
        </button>
    )
}
