import useFetchData from "../hooks/useFetchData"

export default function Dashboard() {
    const product = useFetchData('/products')
    const total = product.data.reduce((a,b)=>a+b.price,0)
    const lowStock = product.data.filter(pro=>pro.quantity <10).length
  return (
    <div id="dashboard-page">

      <div className="main-content">
          <div id="dashboard-content">
              <h2>Dashboard</h2>
              <div className="dashboard-grid">
                  <div className="dashboard-card">
                      <h3>Total Products</h3>
                      <p id="total-products">{product?.data?.length || 0}</p>
                  </div>
                  <div className="dashboard-card">
                      <h3>Low Stock Products</h3>
                      <p id="low-stock-products">{lowStock}</p>
                  </div>
                  <div className="dashboard-card">
                      <h3>Total Stock Value</h3>
                      <p id="total-stock-value">M{total}</p>
                  </div>
              </div>
          </div>
      </div>
  </div>
  )
}
