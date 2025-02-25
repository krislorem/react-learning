// RegistPage.js (优化后的父组件)
import { Card } from 'antd';
import RegistForm from './RegistForm';

const RG = () => {
  return (
    <Card
      title="用户注册"
      bordered={false}
      headStyle={{ fontSize: 20, fontWeight: 'bold' }}
    >
      <RegistForm />
    </Card>
  );
};

export default RG;
