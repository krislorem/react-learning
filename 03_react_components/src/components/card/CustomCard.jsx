import { Card, Avatar } from 'antd';
const { Meta } = Card;

const CustomCard = ({ cover, avatar, title, content }) => {
  return (
    <Card
      hoverable
      cover={<img alt="cover" src={cover} style={{ height: 200, objectFit: 'cover' }} />}
    >
      <Meta
        avatar={<Avatar src={avatar} />}
        title={title}
        description={content}
        style={{ marginBottom: 16 }}
      />
      <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
        更多信息请咨询客服人员
      </div>
    </Card>
  );
};

export default CustomCard;
