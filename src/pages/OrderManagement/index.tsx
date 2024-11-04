import React from 'react';
import { Table, Tag } from 'antd';
import './OrderManagement.less';

const OrderManagement = () => {
  // 模拟订单数据，实际应用中应从API获取
  const orders = [
    {
      id: 1,
      merchantName: '商户A',
      staffName: '顾客1',
      amount: 100,
      status: '已完成',
      date: '2023-04-01',
      workHours: 2, // 添加工时字段
    },
    {
      id: 2,
      merchantName: '商户B',
      staffName: '顾客2',
      amount: 150,
      status: '进行中',
      date: '2023-04-02',
      workHours: 3, // 添加工时字段
    },
    {
      id: 3,
      merchantName: '商户C',
      staffName: '顾客3',
      amount: 200,
      status: '已取消',
      date: '2023-04-03',
      workHours: 1.5, // 添加工时字段
    },
  ];

  const columns = [
    {
      title: '订单ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '商户名称',
      dataIndex: 'merchantName',
      key: 'merchantName',
    },
    {
      title: "工作人员",
      dataIndex: "staffName",
      key: "staffName",
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `¥${amount}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color =
          status === '已完成'
            ? 'green'
            : status === '进行中'
            ? 'geekblue'
            : 'volcano';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '工时',
      dataIndex: 'workHours',
      key: 'workHours',
      render: (workHours: number) => `${workHours} 小时`,
    },
  ];

  return (
    <div className="order-management">
      <h1>订单管理</h1>
      <Table columns={columns} dataSource={orders} rowKey="id" />
    </div>
  );
};

export default OrderManagement;
