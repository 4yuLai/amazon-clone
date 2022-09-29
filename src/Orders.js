import React, { useEffect, useState } from 'react'
import { useStateValue } from "./StateProvider";

import { db } from './firebase';
import './Orders.css';
import Order from './Order';

import { collection, orderBy, onSnapshot, query } from "firebase/firestore";

function Orders() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    
    useEffect(() => {
        if (user) {
            const q = query(collection(db, "users", user?.uid, 'orders'), orderBy('created', 'desc'));
            console.log(q);
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                setOrders(querySnapshot.docs.map(doc =>({
                    id: doc.id,
                    data: doc.data()
                })));
            })
        } else {
            setOrders([])
        }
    }, [user]);

    console.log(orders);

    return (
        <div className='orders'>
        <h1>Your Orders</h1>
        <div className='orders__order'>
            {orders?.map(order => (
                <Order order={order}/>
            ))}
        </div>
        </div>
    )
}

export default Orders
