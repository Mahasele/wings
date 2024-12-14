import React, { useEffect, useState } from 'react'
import useFetchData from '../hooks/useFetchData'
import useAxiosIntercepters from '../hooks/useAxiosIntercepters'
import useAuth from '../hooks/use-auth'
import stringFormat from '../utils/format'


export default function Products() {
    const {user} = useAuth()
    const [add,setAdd] = useState(false)
    const [edit,setEdit] = useState(false)
    const [loading,setLoading] = useState(false)
    const [loadingsell,setLoadingSell] = useState(false)
    const [loadingTDelete,setLoadingTDelete] = useState(false)
    const [loadingDelete,setLoadingDelete] = useState(false)
    const [name,setName] = useState('')
    const [category,setCategory] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState(0)
    const [quantity,setQuantity] = useState(0)
    const [currentProduct,setCurrentProduct] = useState({})
    const [action,setAction] = useState({})
    const [addedProduct,setAddedProduct] = useState({})
    const products = useFetchData('/products/'+user?.userId,[addedProduct,user])
    const transactions = useFetchData('/transactions/'+user?.userId,[addedProduct,user])
    const axios = useAxiosIntercepters()
    const transactionFiltered = transactions.data.filter(trans=>trans.product)
    useEffect(()=>{
        if(edit && currentProduct) {
            setCategory(currentProduct.category)
            setName(currentProduct.name)
            setDescription(currentProduct.description)
            setPrice(currentProduct.price)
            setQuantity(currentProduct.quantity)
        }
    },[edit])
    const reset = () =>{
        setCategory('')
        setName('')
        setDescription('')
        setPrice(0)
        setQuantity(0)
    }
    const handleProductSubmit = async(e)=>{
        e.preventDefault()
        setLoading(true)
        try {
            if(edit && currentProduct) {
                const res = await axios.put('/product',{name,category,description,price,quantity,userId:user?.userId,productId:currentProduct.productId})
                alert(res?.data)  
                setAddedProduct({name,category,description,price,quantity})
                setAdd(false)
                setEdit(false)
                setCurrentProduct({})
                reset()
                return
            }
          const res = await axios.post('/product',{name,category,description,price,quantity,userId:user?.userId})
            alert(res?.data)  
            setAddedProduct({name,category,description,price,quantity})
            setAdd(false)
            reset()
        } catch (error) {
        if(!error?.response) {
          alert('No Response from the Server')
        } else if(error?.response?.status) {
          alert(error?.response?.data)
        } else {
          alert(error.message)
        }
        } finally{
            setLoading(false)
        }
    }
    const handleProductDelete = async(productId)=>{
        setAction(productId)
        setLoadingDelete(true)
        try {
          const res = await axios.delete('product?productId='+productId+'&userId='+user?.userId)
            alert(res?.data)  
            setAddedProduct({})
        } catch (error) {
        if(!error?.response) {
          alert('No Response from the Server')
        } else if(error?.response?.status) {
          alert(error?.response?.data)
        } else {
          alert(error.message)
        }
        } finally {
            setLoadingDelete(false)
        }
    }
    const handleTransactionDelete = async(transactionId)=>{
        setAction(transactionId)
        setLoadingTDelete(true)
        
        try {
          const res = await axios.delete('/transaction?transactionId='+transactionId+'&userId='+user?.userId)
            alert(res?.data)  
            setAddedProduct({})
        } catch (error) {
        if(!error?.response) {
          alert('No Response from the Server')
        } else if(error?.response?.status) {
          alert(error?.response?.data)
        } else {
          alert(error.message)
        }
        } finally {
            setLoadingTDelete(false)
        }
    }
    const handleEdit = (product)=>{ 
        setEdit(true)
        setAdd(true)
        setCurrentProduct(product)
    }
    const handleSell = async (product)=>{ 
        const quantityToSell = prompt('Enter quantity to sell')
        setAction(product)
        if (Number(quantityToSell) <=0 || isNaN(quantityToSell)) {
            alert('Invalid input')
            return
        }
        setLoadingSell(true)
        try {
          const res = await axios.post('selling',{userId:user?.userId,productId:product.productId,quantity:quantityToSell})
            alert(res?.data)  
            setAddedProduct({})
        } catch (error) {
        if(!error?.response) {
          alert('No Response from the Server')
        } else if(error?.response?.status) {
          alert(error?.response?.data)
        } else {
          alert(error.message)
        }
        } finally {
            setLoadingSell(false)
        }
    }
  return (
    <div id="products-content">
    <h2>Product Management</h2>
              
    <div id="product-modal" className={!add?"modal":"hide"}>
        <div className={"modal-content"}>
            <span onClick={()=>{
                setAdd(false)
                setEdit(false)
                setCurrentProduct({})
                }} className="close-modal">&times;</span>
            <h2>{edit ?'Update Product':'Add Product'}</h2>
            <form id="product-form" onSubmit={handleProductSubmit}>
                <div className="form-group">
                    <label htmlFor="product-name">Product Name</label>
                    <input type="text" id="product-name" required value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="product-category">Category</label>
                    <input type="text" id="product-category" required  value={category} onChange={(e)=>setCategory(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="product-description">Description</label>
                    <input type="text" id="product-description" required  value={description} onChange={(e)=>setDescription(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="product-price">Price</label>
                    <input type="number" id="product-price" required  value={price} onChange={(e)=>setPrice(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="product-quantity">Quantity</label>
                    <input type="number" id="product-quantity" required  value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                </div>
                <button type="submit" className="btn">{edit ? loading?'Updating...':'Update Product':loading ?'Adding...':'Add Product'}</button>
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
                    <th>Total Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="products-list">
                {products.loading ? <tr><td colSpan={7}>Loading...</td></tr>:
                products && products.data.length ?
                products?.data?.map(product=>(<tr key={product.productId}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.description}</td>
                    <td>M{stringFormat((product.price).toFixed(2))}</td>
                    <td>{product.quantity}</td>
                    <td>M{stringFormat((Number(product.quantity) * Number(product.price)).toFixed(2))}</td>
                    <td style={{textAlign:"center"}}>
                        <button style={{marginRight:"8px",marginBottom:"8px"}} className='btn' onClick={()=>handleEdit(product)}>Edit</button>
                        <button className='btn' style={{marginRight:"8px",marginBottom:"8px"}} onClick={()=>handleSell(product)}>{(loadingsell  && product.productId=== action.productId)?"Selling...":"Sell"}</button>
                        <button className='btn btn-danger' onClick={()=>handleProductDelete(product.productId)}>{(loadingDelete && product.productId=== action)?'Deleting...':'Delete'}</button></td>
                </tr>))
                :<tr><td colSpan={7}>No Products</td></tr>
                }
            </tbody>
        </table>
        <h2 style={{marginTop:'20px'}}>Transactions</h2>
        <table className="product-table">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Added Quantity</th>
                    <th>Sold Quantity</th>
                    <th>Reduced Quantity</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="products-list">
                {transactions.loading ? <tr><td colSpan={6}>Loading...</td></tr>:
                transactionFiltered && transactionFiltered.length ?
                transactionFiltered.map(transaction=>(<tr key={transaction.transactionId}>
                    <td>{transaction.product.name}</td>
                    <td>{transaction.addedQuantity}</td>
                    <td>{transaction.soldQuantity}</td>
                    <td>{transaction.subtractedQuantity}</td>
                    <td>{new Date(transaction.createdAt).toDateString()}</td>
                    <td style={{textAlign:"center"}}>
                        <button onClick={()=>handleTransactionDelete(transaction.transactionId)} className='btn btn-danger'>{(loadingTDelete && transaction.transactionId === action)?'Deleting...':'Delete'}</button>
                        </td>
                </tr>))
                :<tr><td colSpan={6}>No Transactions</td></tr>
                }
            </tbody>
        </table>
    </div>
  )
}
