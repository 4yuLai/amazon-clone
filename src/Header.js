import React from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className='header'>
        <Link to='/' onClick={() => {window.location.href="/"}} >
            <img 
                className='header__logo'
                src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"
            />
        </Link>
        

        <div className='header__search'>
            <input className='header__searchInput' type="text" />
            <SearchIcon className='header__searchIcon' />
        </div>

        <div className='header__nav'>
            <div className='header__option'>
                <span className='header__optionLineOne'>Hello Guest</span>
                <span className='header__optionLineTwo'>Sign in</span>
            </div>
            <div className='header__option'>
                <span className='header__optionLineOne'>Returns</span>
                <span className='header__optionLineTwo'>& Orders</span>
            </div>
            <div className='header__option'>
                <span className='header__optionLineOne'>Your</span>
                <span className='header__optionLineTwo'>Prime</span>
            </div>
        </div>
        
        <Link to='/checkout' onClick={() => {window.location.href="/checkout"}} >
            <div className='header__optionbasket'>
                <ShoppingBasketIcon />
                <span className='header__optionLineTwo header__basketCount'>0</span>
            </div>
        </Link>
        

    </div>
  )
}

export default Header
