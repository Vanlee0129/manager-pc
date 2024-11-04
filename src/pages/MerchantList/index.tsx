import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Spin } from "antd";
import "./MerchantList.less";
import { ReloadOutlined } from "@ant-design/icons";

// 模拟商户数据，实际应用中应从API获取
const merchants = [
  {
    id: 1,
    name: "商户A",
    address: "北京市朝阳区",
    contactPerson: "张三",
    phone: "13800138000",
  },
  {
    id: 2,
    name: "商户B",
    address: "上海市浦东新区",
    contactPerson: "李四",
    phone: "13900139000",
  },
  {
    id: 3,
    name: "商户C",
    address: "广州市天河区",
    contactPerson: "王五",
    phone: "13700137000",
  },
  {
    id: 4,
    name: "商户D",
    address: "深圳市南山区",
    contactPerson: "赵六",
    phone: "13600136000",
  },
  {
    id: 5,
    name: "商户E",
    address: "成都市武侯区",
    contactPerson: "孙七",
    phone: "13500135000",
  },
  {
    id: 6,
    name: "商户F",
    address: "杭州市拱墅区",
    contactPerson: "周八",
    phone: "13400134000",
  },
];

interface Merchant {
  id: number;
  name: string;
  address: string;
  contactPerson: string;
  phone: string;
}

const MerchantList = () => {
  const [dataSource, setDataSource] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "商户名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "地址",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "联系人",
      dataIndex: "contactPerson",
      key: "contactPerson",
    },
    {
      title: "联系电话",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  // 模拟API调用
  const fetchMerchants = () => {
    setLoading(true);
    // 模拟API延迟
    setTimeout(() => {
      setDataSource(merchants);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchMerchants();
  }, []);

  const handleRefresh = () => {
    fetchMerchants();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const newMerchant = {
        id: dataSource.length + 1,
        ...values,
      };
      setDataSource((prevDataSource: Merchant[]) => [
        ...prevDataSource,
        newMerchant,
      ]);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <div className="merchant-list">
      <h1>商户信息列表</h1>
      <div className="merchant-list-actions">
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          onClick={handleRefresh}
          loading={loading}
        >
          刷新
        </Button>
        <Button type="primary" onClick={showModal}>
          添加商户
        </Button>
      </div>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Spin>

      <Modal
        title="添加商户"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="商户名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="地址" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="contactPerson"
            label="联系人"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="联系电话" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MerchantList;
