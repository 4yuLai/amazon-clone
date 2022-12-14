import React from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from "./StateProvider";
import { getAuth, signOut } from "firebase/auth";



function Header() {
    const [{basket, user}, dispatch] = useStateValue();
    
    const auth = getAuth();
    const handleAuthentication = () => {
        if (user) {
            signOut(auth).then(() => {
                // Sign-out successful.
              }).catch((error) => {
                // An error happened.
              });
        }
    }

    return (
        <div className='header'>
            <Link to='/'>
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
                <Link to={!user && '/login'}>
                    <div onClick={handleAuthentication} className='header__option'>
                        <span className='header__optionLineOne'>Hello {!user ? 'Guest' : user.email}</span>
                        <span className='header__optionLineTwo'>{user ? 'Sign Out' : 'Sign in'}</span>
                    </div>
                </Link>

                <Link to='/orders'>
                    <div className='header__option'>
                        <span className='header__optionLineOne'>Returns</span>
                        <span className='header__optionLineTwo'>& Orders</span>
                    </div>
                </Link>
                
                <div className='header__option'>
                    <span className='header__optionLineOne'>Your</span>
                    <span className='header__optionLineTwo'>Prime</span>
                </div>
            </div>
            
            <Link to='/checkout'>
                <div className='header__optionbasket'>
                    <ShoppingBasketIcon />
                    <span className='header__optionLineTwo header__basketCount'>{basket?.length}</span>
                </div>
            </Link>
            

        </div>
  )
}

export default Header
