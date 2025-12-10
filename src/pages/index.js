import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, deleteUser } from "../store/userSlice.ls";
import { Table, Button, Input, Popconfirm, Card } from "antd";

export default function Home() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);

  const [name, setName] = useState("");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Action",
      render: (_, record) => (
        <Popconfirm
          title="Delete this user?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => dispatch(deleteUser(record.id))}
        >
          <Button danger type="link">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  const add = () => {
    if (!name.trim()) return;
    dispatch(addUser({ id: Date.now(), name }));
    setName("");
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <Card className="w-full max-w-xl shadow-lg">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Redux Toolkit CRUD
        </h1>

        <div className="flex gap-2 mb-4">
          <Input 
            placeholder="Enter user name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="primary" onClick={add}>
            Add
          </Button>
        </div>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={users}
          pagination={false}
        />
      </Card>
    </div>
  );
}
