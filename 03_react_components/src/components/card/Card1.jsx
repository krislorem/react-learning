// Card.jsx
import { Card } from 'antd';
import './Card1.css';

const Card1 = ({
  header,
  children,
  footer,
  hoverable = true,
  width = 300
}) => {
  return (
    <Card
      hoverable={hoverable}
      style={{ width }}
      className="custom-card"
    >
      {header && <div className="card-header">{header}</div>}

      <div className="card-body">
        {children}
      </div>

      {footer && <div className="card-footer">{footer}</div>}
    </Card>
  );
};

export default Card1;
