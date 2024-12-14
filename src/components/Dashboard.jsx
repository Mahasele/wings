import useAuth from "../hooks/use-auth"
import useFetchData from "../hooks/useFetchData"
import stringFormat from "../utils/format"

export default function Dashboard() {
    const {user} = useAuth()
    const products = useFetchData('/products/'+user?.userId,[user])
    const total = products.data.reduce((a,b)=>a+(Number(b.price)*Number(b.quantity)),0)
    const lowStock = products.data.filter(pro=>pro.quantity <10).length
  return (
    <div id="dashboard-page">

      <div className="main-content">
          <div id="dashboard-content">
              <h2>Dashboard</h2>
              <div className="dashboard-grid">
                  <div className="dashboard-card">
                      <h3>Total Products</h3>
                      <p id="total-products">{products?.data?.length || 0}</p>
                  </div>
                  <div className="dashboard-card">
                      <h3>Low Stock Products</h3>
                      <p id="low-stock-products">{lowStock}</p>
                  </div>
                  <div className="dashboard-card">
                      <h3>Total Stock Value</h3>
                      <p id="total-stock-value">M{stringFormat(total.toFixed(2))}</p>
                  </div>
              </div>
          </div>
      </div>
  </div>
  )
}
