import React from 'react';
import './Checkout.css';
import Subtotal from './Subtotal'

function Checkout() {
  return (
    <div className='checkout'>
      <div className='checkout__left'>
        <img className='checkout__ad' src='https://images-eu.ssl-images-amazon.com/images/G/02/giftcard/barbwehr/uk_q222_evergreen/xcm_banners_gc_phone_650x45-bw3yq_1300x90_gb-en._CB626501920_.jpg' alt='' />
        
        <div>
          <h2 className='checkout__title'>Your Shopping Basket</h2>
          {/* <BasketItem /> */}
        </div>
      </div>

      <div className='checkout__right'>
        <Subtotal />
      </div>
    </div>
  )
}

export default Checkout
