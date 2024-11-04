import React, { useState, useEffect } from 'react';
import { Table, Button, message, Space, Typography, Tag, Modal, Form, Input } from 'antd';
import { ReloadOutlined, UserAddOutlined } from '@ant-design/icons';

// 定义Worker接口
interface Worker {
  id: number;
  name: string;
  age: number;
  status: '工作中' | '在线' | '离线';
  salary: number; // 新增工资字段
}

// 模拟API函数
const getWorkers = (): Promise<Worker[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: '张三', age: 28, status: '工作中', salary: 25 },
        { id: 2, name: '李四', age: 32, status: '在线', salary: 30 },
        { id: 3, name: '王五', age: 26, status: '离线', salary: 22 },
        { id: 4, name: '赵六', age: 30, status: '工作中', salary: 28 },
        { id: 5, name: '孙七', age: 35, status: '在线', salary: 35 },
        { id: 6, name: '周八', age: 29, status: '工作中', salary: 27 },
        { id: 7, name: '吴九', age: 27, status: '离线', salary: 24 },
        { id: 8, name: '郑十', age: 31, status: '在线', salary: 29 },
      ]);
    }, 1000); // 模拟网络延迟
  });
};

const WorkerList: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    setLoading(true);
    try {
      const data = await getWorkers();
      setWorkers(data);
    } catch (error) {
      message.error('获取工作人员列表失败');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = status === '工作中' ? 'green' : status === '在线' ? 'blue' : 'gray';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: '工资',
      dataIndex: 'salary',
      key: 'salary',
      render: (salary: number) => `${salary}/h`,
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: Worker) => (
        <Button type="primary" onClick={() => handleEdit(record.id)}>
          详情
        </Button>
      ),
    },
  ];

  const handleEdit = (id: number) => {
    // 实现编辑功能
    console.log('编辑工作人员:', id);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log('新增人员:', values);
      // 这里应该调用API来添加新人员
      // 添加成功后，刷新列表
      fetchWorkers();
      setIsModalVisible(false);
      form.resetFields();
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Typography.Title level={2}>人员列表</Typography.Title>
        <Space>
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={fetchWorkers}
            loading={loading}
          >
            刷新
          </Button>
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={showModal}
          >
            添加人员
          </Button>
        </Space>
        <Table
          columns={columns}
          dataSource={workers}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </Space>
      <Modal
        title="添加人员"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="年龄"
            rules={[{ required: true, message: '请输入年龄' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="salary"
            label="工资（每小时）"
            rules={[{ required: true, message: '请输入工资' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WorkerList;
