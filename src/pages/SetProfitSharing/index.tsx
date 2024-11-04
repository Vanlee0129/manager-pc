import React from 'react';
import { Form, InputNumber, Button, message } from 'antd';
import './SetProfitSharing.less';

const SetProfitSharing = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Saving profit sharing:', values);
    message.success('分账比例设置成功');
  };

  return (
    <div className="set-profit-sharing">
      <h1>设置分账比例</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="merchantShare"
          label="商户分成比例 (%)"
          rules={[{ required: true, message: '请输入商户分成比例' }]}
        >
          <InputNumber min={0} max={100} />
        </Form.Item>
        <Form.Item
          name="platformShare"
          label="平台分成比例 (%)"
          rules={[{ required: true, message: '请输入平台分成比例' }]}
        >
          <InputNumber min={0} max={100} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存分账设置
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SetProfitSharing;
