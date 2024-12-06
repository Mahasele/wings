import React from 'react'

export default function Users() {
  return (
    <div id="users-content" >
    <h2>User Management</h2>

    <div id="user-modal" className="modal">
        <div className="modal-content">
            <span className="close-modal">&times;</span>
            <h2>Add User</h2>
            <form id="user-form">
                <div className="form-group">
                    <label for="user-name">Full Name</label>
                    <input type="text" id="user-name" required/>
                </div>
                <div className="form-group">
                    <label for="user-email">Email</label>
                    <input type="email" id="user-email" required/>
                </div>
                <div className="form-group">
                    <label for="user-password">Password</label>
                    <input type="password" id="user-password" required/>
                </div>
                <div className="form-group">
                    <label for="user-role">Role</label>
                    <select id="user-role" required>
                        <option value="staff">Staff</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className="btn">Create User</button>
            </form>
        </div>
    </div>
        <button className="btn" id="add-user-btn">Add New User</button>
        <table className="product-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
        <tbody id="users-list">
            {/* <!-- Users will be dynamically added here --> */}
            </tbody>
        </table>
    </div>
  )
}
