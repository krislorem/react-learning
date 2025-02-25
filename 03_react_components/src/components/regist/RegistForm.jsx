// RegistForm.js
import { useState } from 'react';
import './registform.css';

const RegistForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="regist-form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-input-group">
          <label className="form-label">
            姓名
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </label>
        </div>
        <div className="form-input-group">
          <label className="form-label">
            邮箱
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </label>
        </div>
        <button type="submit" className="submit-button">
          立即注册
        </button>
      </form>
    </div>
  );
};

export default RegistForm;
