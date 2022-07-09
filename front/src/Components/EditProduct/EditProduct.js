
import './EditProduct.css'
import Button from '../UI/Button'

const EditProduct = () => {
    return <div style={{margin: "0 150px"}}>
        <h1 className="edit__heading">Edit Product</h1>
        <div>
            <div className='edit__first-row'>
                <div className="edit__input">
                    <label htmlFor="f_name">First Name *</label>
                    <br></br>
                    <input type="text" required></input>
                </div>
                <div className="edit__input">
                    <label htmlFor="l_name">Last Name *</label>
                    <br></br>
                    <input type="text" required></input>
                </div>
                <div className="edit__input">
                    <label htmlFor="f_name">Shop By Categories</label>
                    <br></br>
                    <input type="text" required></input>
                </div>
                <div className="edit__input">
                    <label htmlFor="f_name">Description</label>
                    <br></br>
                    <input type="text" required></input>
                </div>
            </div>
            <Button type="buttton" style={{margin: "20px 0 80px", backgroundColor: "#80bf32"}}>Save</Button>
            <Button style={{margin: "20px 20px 80px"}} type="button">Cancel</Button>
        </div>
    </div>
}

export default EditProduct
