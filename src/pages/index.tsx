import { Card, Statistic } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import "./index.less";

const App = () => {
  // 模拟数据，实际应用中应从API获取
  const todayStats = {
    staffOnDuty: 25,
    orderCount: 150,
    orderRevenue: 15000,
  };

  return (
    <div className="dashboard">
      <h1>仪表板</h1>
      <div className="dashboard-stats">
        <Card className="dashboard-stat-card">
          <Statistic
            title="今日上岗人数"
            value={todayStats.staffOnDuty}
            prefix={<UserOutlined />}
          />
        </Card>
        <Card className="dashboard-stat-card">
          <Statistic
            title="今日订单数"
            value={todayStats.orderCount}
            prefix={<ShoppingCartOutlined />}
          />
        </Card>
        <Card className="dashboard-stat-card">
          <Statistic
            title="今日订单流水"
            value={todayStats.orderRevenue}
            prefix={<DollarOutlined />}
            suffix="元"
          />
        </Card>
      </div>
    </div>
  );
};

export default App;
