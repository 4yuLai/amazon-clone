import React from 'react';
import "./Home.css";
import Product from './Product'

function Home() {
  return (
    <div className='home'>
      <div className='home__container'>
        <img className='home__image' src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg' alt='' />
        <div className='home__row'>
            <Product
                id='1'
                title='Wild Republic 12257 Sloth Plush, Soft Toy, Cuddlekins, 30 cm, Grey' 
                price={12.99} 
                image='https://m.media-amazon.com/images/I/81oZevlnahL._AC_SL1500_.jpg'
                rating={5} 
            />
            <Product 
                id='2'
                title='KandyToys Soft Stuffed Brown Sloth' 
                price={12.99} 
                image='https://m.media-amazon.com/images/I/711YIvvBuhL._AC_SL1493_.jpg'
                rating={4} 
            />
        </div>
        <div className='home__row'>
            <Product
                id='3' 
                title='Jellycat Little Owl' 
                price={69.99} 
                image='https://m.media-amazon.com/images/I/71dfkCL2j6L._AC_SL1500_.jpg'
                rating={5} 
            />
            <Product
                id='4' 
                title='Jellycat Tumblie Sheepdog (35cm)' 
                price={30.99} 
                image='https://m.media-amazon.com/images/I/41ySqlaoERL._AC_.jpg'
                rating={4} 
            />
            <Product 
                id='5'
                title='JELLYCAT FUDDLEWUDDLE MONKEY - MEDIUM' 
                price={39.99} 
                image='https://m.media-amazon.com/images/I/61lTr9MSLdL._AC_SL1024_.jpg'
                rating={3} 
            />
        </div>
        <div className='home__row'>
            <Product 
                id='6'
                title='Jellycat Amuseable Small Croissant Collectable Plush Decoration' 
                price={29.99} 
                image='https://m.media-amazon.com/images/I/41HeGbfm07L._AC_.jpg'
                rating={4} 
            />
        </div> 
      </div>
    </div>
  )
}

export default Home
