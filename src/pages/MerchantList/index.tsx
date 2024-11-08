import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Spin, PaginationProps } from "antd";
import "./MerchantList.less";
import { ReloadOutlined } from "@ant-design/icons";
import { getMerchantList, createMerchant } from "@/services/merchant";
import { useRequest } from "ahooks";

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
  const { runAsync: createMerchantRequest, loading: createMerchantRequestLoading } = useRequest(createMerchant, {
    manual: true,
  });
  const [currentPage, setCurrentPage] = useState(1);

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

  const fetchMerchants = async () => {
    setLoading(true);
    const merchantsData = await getMerchantList();
    setDataSource(merchantsData.merchants);
    setLoading(false);
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
    form.validateFields().then(async (values) => {
      const newMerchant = {
        id: dataSource.length + 1,
        ...values,
      };
      const res = await createMerchantRequest(newMerchant);
      // 如果请求成功，刷新商户列表, 并且弹窗展示商户的用户名和密码
      if (res) {
        Modal.success({
          title: "商户添加成功",
          content: (
            <div>
              <p>商户帐号: {res.credentials.username}</p>
              <p>商户密码: {res.credentials.password}</p>
            </div>
          ),
        });
      }
      setCurrentPage(1);
      handleRefresh();
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const onPageChange: PaginationProps['onChange'] = (page) => {
    console.log(page);
    setCurrentPage(page);
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
          pagination={{ pageSize: 5, current: currentPage, onChange: onPageChange }}
        />
      </Spin>

      <Modal
        title="添加商户"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ loading: createMerchantRequestLoading }}
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
