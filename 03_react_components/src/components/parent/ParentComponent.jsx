// ParentComponent.jsx
import { Button, Avatar } from 'antd';
import Card1 from '../card/Card1';
import { StarFilled } from '@ant-design/icons'
const ParentComponent = () => {
  return (
    <div style={{ padding: 24 }}>
      {/* 基本使用 */}
      <Card1
        header="用户信息"
        footer={
          <>
            <Button type="primary">编辑</Button>
            <Button danger>删除</Button>
          </>
        }
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Avatar src="https://randomuser.me/api/portraits/men/1.jpg" />
          <div>
            <p>用户名: john_doe</p>
            <p>邮箱: john@example.com</p>
          </div>
        </div>
      </Card1>

      {/* 自定义宽度 */}
      <Card1
        width={400}
        header={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <StarFilled style={{ color: '#ffc107' }} />
            <span>特别推荐</span>
          </div>
        }
        footer={
          <Button type="dashed" block>
            了解更多
          </Button>
        }
      >
        <img
          src="https://picsum.photos/400/200"
          alt="推荐内容"
          style={{
            width: '100%',
            height: 200,
            objectFit: 'cover',
            borderRadius: 8
          }}
        />
      </Card1>
    </div>
  );
};

export default ParentComponent
