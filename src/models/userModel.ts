import { useState } from "react";

export default function userModel() {
  const [user, setUser] = useState<{
    username: string;
    role: string;
    merchantId: number;
  }>();

  return { user, setUser };
};