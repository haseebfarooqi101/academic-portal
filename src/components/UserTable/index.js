
// antd 
// td
import { Table, Button } from "antd";
//import Link from "next/link";

export default function UserTable({ users, onDelete, onEdit }) {
  // const handleDelete = (id) => {
  //   onDelete(String(id));  
   // Always send ID  
   const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-3">
          <Button className="text-blue-600 hover:underline" onClick={() => onEdit(record.id)}>
            Edit
          </Button>

          <Button danger type="link" onClick={() => onDelete(String(record.id))}>
            Delete
          </Button>
        </div>
      ),
    },
  ];
  

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <Table
        className="my-custom-table"
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
}

