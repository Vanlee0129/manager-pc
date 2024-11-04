import React, { useState, useEffect } from "react";
import { useParams } from "umi";
import { Typography, Divider, Image, Empty, Spin } from "antd";

const { Title, Text } = Typography;

interface WorkerInfo {
  id: string;
  name: string;
  age: number;
  phone: string;
  avatar: string;
  photos: string[];
}

// 模拟的API调用函数
const fetchWorkerInfo = (id: string): Promise<WorkerInfo> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: "张三",
        age: 30,
        phone: "13800138000",
        avatar: "https://example.com/avatar.jpg",
        photos: [
          "https://example.com/photo1.jpg",
          "https://example.com/photo2.jpg",
          "https://example.com/photo3.jpg",
        ],
      });
    }, 1000); // 模拟网络延迟
  });
};

const WorkerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [workerInfo, setWorkerInfo] = useState<WorkerInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorkerInfo = async () => {
      try {
        const data = await fetchWorkerInfo(id || "");
        setWorkerInfo(data);
      } catch (error) {
        console.error("Failed to fetch worker info:", error);
      } finally {
        setLoading(false);
      }
    };

    loadWorkerInfo();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Spin spinning={loading}>
          <Empty></Empty>
        </Spin>
      </div>
    );
  }

  if (!workerInfo) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Empty></Empty>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, padding: "0 24px" }}>
      <Title level={2} style={{ marginBottom: "24px" }}>人员详情</Title>
      <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "24px" }}>
        <div>
          <Title level={3} style={{ marginBottom: "8px" }}>{workerInfo.name}</Title>
          <Text style={{ display: "block", marginBottom: "4px" }}>年龄: {workerInfo.age}</Text>
          <Text>电话: {workerInfo.phone}</Text>
        </div>
      </div>
      <Divider style={{ margin: "24px 0" }} />
      <Title level={4} style={{ marginBottom: "16px" }}>照片墙</Title>
      <Image.PreviewGroup>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {workerInfo.photos.map((photo, index) => (
            <Image
              key={index}
              width={200}
              src={photo}
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          ))}
        </div>
      </Image.PreviewGroup>
    </div>
  );
};

export default WorkerDetail;
