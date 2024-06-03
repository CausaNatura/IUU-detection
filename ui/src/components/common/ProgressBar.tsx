import { Progress } from 'antd';

interface IProgressBar {
  percent: number;
  format: (number?: number) => string;
}

const ProgressBar = ({ format, percent }: IProgressBar) => {
  return <Progress type="circle" percent={percent} format={format} />;
};

export default ProgressBar;
