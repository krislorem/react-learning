// RegistPage.js
import { useState } from 'react';
import RegistForm from './RegistForm';
import './registpage.css';

const RegistPage = () => {
  const [submittedData, setSubmittedData] = useState(null);

  const handleFormSubmit = (data) => {
    setSubmittedData(data);
  };

  return (
    <div className="regist-page-container">
      <h1 className="page-title">用户注册</h1>
      <RegistForm onSubmit={handleFormSubmit} />

      {submittedData && (
        <div className="result-box">
          <h2 className="success-message">注册成功！</h2>
          <div className="result-text">
            <strong>姓名：</strong>{submittedData.name}
            <br />
            <strong>邮箱：</strong>{submittedData.email}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistPage;
