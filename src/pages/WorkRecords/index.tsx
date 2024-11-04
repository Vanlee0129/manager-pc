import React from 'react';
import { Table } from 'antd';
import './WorkRecords.less';

const WorkRecords = () => {
  // 模拟工作记录数据，实际应用中应从API获取
  const records = [
    {
      id: 1,
      staffName: '张三',
      date: '2023-04-01',
      hours: 8,
      tasks: '客户服务，订单处理',
    },
    {
      id: 2,
      staffName: '李四',
      date: '2023-04-02',
      hours: 7.5,
      tasks: '库存管理，商品上架',
    },
    {
      id: 3,
      staffName: '王五',
      date: '2023-04-03',
      hours: 8.5,
      tasks: '客户回访，销售支持',
    },
  ];

  const columns = [
    {
      title: '员工姓名',
      dataIndex: 'staffName',
      key: 'staffName',
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '工作时长',
      dataIndex: 'hours',
      key: 'hours',
      render: (hours: number) => `${hours} 小时`,
    },
    {
      title: '工作内容',
      dataIndex: 'tasks',
      key: 'tasks',
    },
  ];

  return (
    <div className="work-records">
      <h1>工作记录</h1>
      <Table columns={columns} dataSource={records} rowKey="id" />
    </div>
  );
};

export default WorkRecords;
