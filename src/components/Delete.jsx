import React, { useState } from 'react';
import './Profile.css';

const AccountDeletion = ({ onAccountDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPassword('');
    setPasswordError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleAccountDeletion = async (e) => {
    e.preventDefault();

    if (!password) {
      setPasswordError('Password is required');
      return;
    }
    try {
      await onAccountDelete(password);
      closeModal();
    } catch (error) {
      setPasswordError(error.message || 'Failed to delete account');
    }
  };

  return (
    <section className="account-deletion-section">
      <header>
        <h2 className="account-deletion-title">Delete Account</h2>
      </header>

      <button 
        className="delete-account-button"
        onClick={openModal}
      >
        Delete Account
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <form onSubmit={handleAccountDeletion} className="modal-form">
              <h2 className="modal-title">
                Are you sure you want to delete your account?
              </h2>
              <div className="password-input-group">
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Password"
                  className={`password-input ${passwordError ? 'input-error' : ''}`}
                />
                {passwordError && (
                  <p className="error-message">{passwordError}</p>
                )}
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="confirm-delete-button"
                >
                  Delete Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default AccountDeletion;