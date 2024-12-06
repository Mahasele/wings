import React, { useState } from 'react'
import useFetchData from '../hooks/useFetchData'
import useAxiosIntercepters from '../hooks/useAxiosIntercepters'


export default function Products() {
    const [add,setAdd] = useState(false)
    const [edit,setEdit] = useState(false)
    const [name,setName] = useState('')
    const [category,setCategory] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState(0)
    const [quantity,setQuantity] = useState(0)
    const [currentProduct,setCurrentProduct] = useState({})
    const product = useFetchData('/products')
    const axios = useAxiosIntercepters()
    console.log(product)

    const handleProductSubmit = async(e)=>{
        e.preventDefault()
        try {
          const res = await axios.post('product',{name,category,description,price,quantity})
            alert(res?.data)  
        } catch (error) {
            alert(error.message)
        }
    }
    const handleProductDelete = async(productId)=>{
        try {
          const res = await axios.delete('product?productId='+productId)
            alert(res?.data)  
        } catch (error) {
            alert(error.message)
        }
    }
    const handleEdit = (product)=>{ 
        setEdit(true)
        setAdd(true)
        setCurrentProduct(product)
    }
  return (
    <div id="products-content">
    <h2>Product Management</h2>
              
    <div id="product-modal" className={!add?"modal":"hide"}>
        <div className={"modal-content"}>
            <span onClick={()=>setAdd(false)} className="close-modal">&times;</span>
            <h2>Add Product</h2>
            <form id="product-form" onSubmit={handleProductSubmit}>
                <div className="form-group">
                    <label for="product-name">Product Name</label>
                    <input type="text" id="product-name" required value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label for="product-category">Category</label>
                    <input type="text" id="product-category" required  value={category} onChange={(e)=>setCategory(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label for="product-description">Description</label>
                    <input type="text" id="product-description" required  value={description} onChange={(e)=>setDescription(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label for="product-price">Price</label>
                    <input type="number" id="product-price" required  value={price} onChange={(e)=>setPrice(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label for="product-quantity">Quantity</label>
                    <input type="number" id="product-quantity" required  value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                </div>
                <button type="submit" className="btn">Save Product</button>
            </form>
        </div>
    </div>
        <button className="btn" onClick={()=>setAdd(true)} id="add-product-btn">Add New Product</button>
        <table className="product-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="products-list">
                {product && product.data.length ?
                product?.data?.map(product=>(<tr key={product.productId}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td style={{display:"flex",gap:"8px",justifyContent:"center"}}><button className='btn' onClick={()=>handleEdit(product)}>Edit</button><button className='btn'>Sell</button><button className='btn btn-danger' onClick={()=>handleProductDelete(product.productId)}>Delete</button></td>
                </tr>))
                :<tr><td colSpan={6}>No Products</td></tr>
                }
            </tbody>
        </table>
    </div>
  )
}
