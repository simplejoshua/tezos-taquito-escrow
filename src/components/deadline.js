import { Statistic } from 'antd';

const Deadline = ({dl}) => {

  const { Countdown } = Statistic;
  return(

      <Countdown title="Deadline (Set Epoch)" value={dl} format="D [Days] H [Hours] m [Minutes] s [Seconds]" />
  )
    };
export default Deadline;