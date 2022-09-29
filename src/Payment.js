import React, {useState, useEffect} from 'react'
import './Payment.css';
import CheckoutProduct from './CheckoutProduct';

import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer'

import { Link , useHistory} from 'react-router-dom';
import { useStateValue } from "./StateProvider";
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import axios from './axios';
import { db } from './firebase';

import { doc, setDoc } from "firebase/firestore"; 




function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history=useHistory();
    
    const stripe = useStripe();
    const elements = useElements();
    
    // onChange 
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const [clientSecret, setClientSecret] = useState('');
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState('');

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        // Generate the speical stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            })
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();

    }, [basket]);

    console.log('THE SECRET IS >>>', clientSecret);

    const handleSubmit = async ev => {
        ev.preventDefault();
        setProcessing(true);
    
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(async ({paymentIntent}) => {
            // push into database
            // Add a new document in collection "cities"
            console.log(db);
            console.log(user.uid);
            console.log(paymentIntent);
            await setDoc(doc(db, 'users', user?.uid, 'orders' , paymentIntent.id), {
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            });

            // paymentIntent = payment confirmation
            setError(null);
            setProcessing(false);
            setSucceeded(true);

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders')
        });
    
        // if (payload.error) {
        //   setError(`Payment failed ${payload.error.message}`);
        //   setProcessing(false);
        // } else {
        //   setError(null);
        //   setProcessing(false);
        //   setSucceeded(true);
        // }
    };

    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
                </h1>
                {/* Payment section - delivery address */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Dublin</p>
                    </div>
                </div>

                {/* Payment section - review items */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item =>(
                            <CheckoutProduct 
                              id = {item.id}
                              title = {item.title}
                              image = {item.image}
                              price = {item.price}
                              rating = {item.rating}
                            />
                        ))}
                    </div>
                </div>

                {/* Payment section - Payment method */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment__detail'>
                        {/* stripe */}
                        <form onSubmit={handleSubmit}>
                            <CardElement  onChange={handleChange}/>
                            <div className='payment__priceContainer'>
                                <CurrencyFormat 
                                    renderText={(value) => (
                                        <>
                                            <h3>Order Total: {value}</h3>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'€'}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>

                            {/* Errors */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default Payment
