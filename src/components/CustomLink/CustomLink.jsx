import React from 'react';
import { Link, useMatch } from 'react-router-dom';

const CustomLink = ({children, to, ...props}) => {
  const match = useMatch(`${to}/*`)
  return (
    <Link 
      to={to} 
      style={{
        color: match ? '#00AEAE' : 'white',
        borderBottom: match ? "3px solid #00AEAE" : 'none',
        fontWeight:'bold'
      }}
      {...props}
      >
        {children}
    </Link>
  )
}

export default CustomLink