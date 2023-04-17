import { Col, Row, Statistic } from 'antd';
import CountUp from 'react-countup';

const formatter = (value) => <CountUp end={value} separator="," />;

const ExchangeCost = ({fromOwner, fromCounterparty}) => (
  <Row gutter={16}>
    <Col span={12}>
      <Statistic title="From Owner (in Mutez)" value={fromOwner} formatter={formatter} />
    </Col>
    <Col span={12}>
      <Statistic title="From Counterparty (in Mutez)" value={fromCounterparty} precision={2} formatter={formatter} />
    </Col>
  </Row>
);
export default ExchangeCost;