
import './ProductListing.css'
import itemImage from '../Images/item_image.jpeg'
import Button from '../UI/Button'
import React from 'react'
import axios from 'axios'
import AuthContext from '../Context/auth_context'

const ProductCard = (props) => {
    const handleClick = (event) => {
        const bookId = event.target.id
        const userToken = localStorage.getItem('userToken')
        const book = {
            bookId: bookId,
            quantity: 1
        }
        axios.post("http://localhost:3000/add_to_cart", book, {
            headers: {
                Authorization: userToken
            }
        }).then(data => {
            console.log(data.data)
        }).catch(err => {
            console.log(err)
        })
    }

    return <div className='product-card'>
        <img className="product__image" src={props.itemImage} alt="item" />
        <div className='product__info'>
            <h3>{props.produtTitle}</h3>
            <p className="product__description">{props.productDescription}</p>
            <div className="prices">
                <h4>MRP ${props.price}</h4>
                <h4>${props.price}</h4>
            </div>
        </div>
        <div style={{width: "100%", textAlign: "center"}}>
            <Button 
                onClick={handleClick} 
                className="product__add__button" 
                style={{width: "90%", margin: "10px auto"}} 
                id={props.id}
                type="button">
            ADD TO CART</Button>
        </div>
    </div>
}

const ProductListing = () => {

    const [books, setBooks] = React.useState([])

    React.useEffect(() => {
        const userToken = localStorage.getItem('userToken')
        axios.get('http://localhost:3000/books', ).then(data => {
            setBooks(data.data)
        }).catch(err => {
            return
        })
    }, [])

    const renderBooks = books.map(book => {
        return <ProductCard 
            itemImage={itemImage}
            produtTitle={book.book_name}
            productDescription={book.description}
            price={book.price}
            id={book.bookId}
            key={book.bookId}
        />
    })

    return <div style={{
        fontFamily: "'Roboto', sans-serif"
    }}>
        <h1 className="dashboard__heading">Product Listing</h1>
        <div className="dashboard">
            {renderBooks}
        </div>
    </div>
}

export default ProductListing
