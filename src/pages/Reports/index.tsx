import { Card } from 'antd';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './Reports.less';

const Reports = () => {
  // 模拟报表数据，实际应用中应从API获取
  const reportData = [
    { name: '1月', 收入: 4000, 支出: 2400 },
    { name: '2月', 收入: 3000, 支出: 1398 },
    { name: '3月', 收入: 2000, 支出: 9800 },
    { name: '4月', 收入: 2780, 支出: 3908 },
    { name: '5月', 收入: 1890, 支出: 4800 },
    { name: '6月', 收入: 2390, 支出: 3800 },
  ];

  return (
    <div className="reports">
      <h1>报表</h1>
      <Card title="月度收支报表">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={reportData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="收入" fill="#8884d8" />
            <Bar dataKey="支出" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Reports;
