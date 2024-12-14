
import useAuth from '../hooks/use-auth'
import useFetchData from '../hooks/useFetchData'

export default function Users() {
    const {user} = useAuth()
    const users = useFetchData('/users/'+user?.userId,[user])
  return (
    <div id="users-content" >
    <h2>User Management</h2>

        <table className="product-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody id="users-list">
                {users.loading ? <tr><td colSpan={2}>Loading...</td></tr> :
                 (users.data && users.data.length) ?users.data.map(usr=>
                 (<tr key={usr.userId}>
                    <td>{usr.name}</td>
                    <td>{usr.email}</td>
                 </tr>)):<tr><td colSpan={2}>No users just yet</td></tr> 
                }               
            </tbody>
        </table>
    </div>
  )
}
