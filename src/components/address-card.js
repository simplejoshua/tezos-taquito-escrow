import { Card, Col, Row } from 'antd';

const AddressCard = ({account, ownerHash, counterpartyHash, adminHash}) => (
  <Row gutter={16}>
    <Col span={6}>
      <Card title="Your Address" bordered={true}>
        {account}
      </Card>
    </Col>
    <Col span={6}>
      <Card title="Owner Address" bordered={true}>
        { ownerHash }
      </Card>
    </Col>
    <Col span={6}>
      <Card title="Counterparty Address" bordered={true}>
        { counterpartyHash }
      </Card>
    </Col>
    <Col span={6}>
      <Card title="Admin Address" bordered={true}>
        { adminHash }
      </Card>
    </Col>
  </Row>
);
export default AddressCard;