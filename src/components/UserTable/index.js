
// antd 
// td
import ReusableTable from "../ReusableTable";
import { Popconfirm, Button } from "antd";
//import Link from "next/link";

export default function UserTable({ users, onDelete, onEdit }) {

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
             
          <Popconfirm
          title="Are you sure you want to delete this user?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => onDelete(record.id)}
        >
           {/* onClick={() => onDelete(String(record.id))} */}
          <Button danger type="link" >
            Delete
          </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">User Records</h2>

        <ReusableTable
          columns={columns}
          dataSource={users}
          loading={false}
       />
    </div>
  );
}

