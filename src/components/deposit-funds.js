import { InputNumber } from 'antd';
import { Button } from 'antd';

const DepositFunds = ({inputFunds, onDepositFunds, handleDepositFunds}) => (
  <>
    <InputNumber
      prefix="ꜩ"
      style={{
        width: '200px',
        height: '40px'
      }}
      size='large'
      value={inputFunds}
    //   onChange={handleDepositFunds}
    />
    <Button type="primary" size={'default'} onClick={onDepositFunds}>
        Deposit
    </Button>
  </>
);
export default DepositFunds;