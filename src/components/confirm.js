import { Button, Popconfirm } from 'antd';
import { useState } from 'react';

const Confirm = ({action, func}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
    setOpen(true);
  };
  const handleOk = async() => {
    setConfirmLoading(true);
    console.log("loading is " + confirmLoading);
    setOpen(false);
    await func();
    setConfirmLoading(false);
    
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  return (
    <Popconfirm
      title="Confirm"
      description={"Confirm " + action.toLowerCase() + " of funds?"}
      open={open}
      onConfirm={handleOk}
      okButtonProps={{
        loading: confirmLoading,
      }}
      onCancel={handleCancel}
    >
      <Button type="primary" onClick={showPopconfirm} size='large' ghost={confirmLoading}>
        {confirmLoading? action + "ing..." : action}
      </Button>
    </Popconfirm>
  );
};
export default Confirm;