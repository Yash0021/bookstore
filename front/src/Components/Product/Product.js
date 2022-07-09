
import React from 'react'
import './Product.css'
import Button from '../UI/Button'
import AuthContext from '../Context/auth_context'
import axios from 'axios'

const Product = () => {

    const ctx = React.useContext(AuthContext)
    const [userCart, setUserCart] = React.useState([])

    React.useState(() => {
        const userToken = localStorage.getItem('userToken')
        axios.get('http://localhost:3000/my_cart', {
            headers: {
                Authorization: userToken
            }
        }).then(data => {
            setUserCart(data.data.currentCart)
        }).catch(err => {
            return
        }, [])
    })

    const renderCart = userCart.map((cartItem, i) => {
        return <tr key={cartItem.i}>
            <td>{i+1}</td>
            <td>{cartItem.title}</td>
            <td>{cartItem.author}</td>
            <td>{cartItem.publisher}</td>
            <td>
                <button id={cartItem.bookId} className="product__edit">Edit</button>
                <button id={cartItem.bookId} className="product__delete">Delete</button>
            </td>
        </tr>
    })

    return <div className="final-product">
        <h1 className="product__heading">Products</h1>
        <div className="product__search">
            <input type="text" placeholder="Search..."></input>
            <Button type="button" style={{width: '150px', borderRadius: "0"}}>Add Product</Button>
        </div>
        {userCart.length < 1 ? 
            <h3 style={{textAlign: "center", color: "red", margin: "100px 0"}}>No item in your cart.</h3> 
        :
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Writer</th>
                        <th>Publisher</th>
                        <th>Edit/Remove</th>
                    </tr>
                    {renderCart}
                </tbody>
            </table>
        }
    </div>
}

export default Product
