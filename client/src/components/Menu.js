import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
    return (
        <div className='menu'>
          <Link to='/'><div className='logo'>LOGO</div></Link>
        </div>
    )
}

export default Menu
