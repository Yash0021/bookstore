
import Button from '../UI/Button'
import cartImage from '../Images/item_image.jpeg'
import './Cart.css'
import React from 'react'
import axios from 'axios'

const CartItem = (props) => {

    const handleClick = (event) => {
        return props.remove(event.target.id)
    }

    return <div className="cart-container">
        <div className='cart-item'>
            <img className="cart__image" src={props.itemImage} alt="cart item"></img>
            <div>
                <h4 className="cart__item-heading">{props.itemHeading}</h4>
                <p className="cart__item-name">Item name</p>
                <div style={{display: "flex"}}>
                    <div className="cart__button" type="button">+</div>
                    <div style={{height: "20px", width: "20px", textAlign: "center"}} type="button">1</div>
                    <div className="cart__button" type="button">-</div>
                </div>
            </div>
        </div>
        <div className="cart__price">
            <p>{props.itemPrice}</p>
            <p><small style={{textDecoration: "line-through"}}>1000</small> 50% off</p>
            <Button onClick={handleClick} id={props.id} type="button">Remove</Button>
        </div>
    </div>
}

const Cart = () => {

    const [userCart, setUserCart] = React.useState([])
    const [totalAmout, setTotalAmount] = React.useState(0)

    React.useEffect(() => {
        const userToken = localStorage.getItem('userToken')
        axios.get('http://localhost:3000/my_cart', {
            headers: {
                Authorization: userToken
            }
        }).then(data => {
            setUserCart(data.data.currentCart)
            setTotalAmount(data.data.totalAmout)
        }).catch(err => {
            return
        })
    }, [])

    const updateCart = (removeItemId) => {
        const newCart = userCart.filter(item => {
            return item.bookId !== removeItemId
        })
        console.log(removeItemId)

        axios.delete('http://localhost:3000/remove_from_cart', {bookId: removeItemId}, {
            headers: {
                Authorization: localStorage.getItem('userToken')
            }
        }).then(data => {
            console.log(data.data)
        })
        setUserCart(newCart)
    }

    const renderCart = userCart.map((item, i) => {
        return <CartItem 
            itemImage={cartImage}
            itemHeading={item.title}
            itemPrice={item.price}
            key={i}
            id={item.bookId}
            remove={updateCart}
        />
    })

    return <>
        <h1 style={{
            margin: "50px auto 25px auto",
            fontFamily: "'Roboto', sans-serif",
            textAlign: "center",
            fontSize: "32px"
        }}>Your Cart</h1>
        <div>
            <div className="cart__pricing">
                <p>My shopping cart</p>
                <p>Total price: {totalAmout}</p>
            </div>
            <div>
                {renderCart}
            </div>
        </div>
    </>
}

export default Cart
