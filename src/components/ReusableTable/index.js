import { Table } from "antd";

export default function ReusableTable({ columns, dataSource, loading }) {
  return (
    <div className="my-custom-table">

      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={false}
        rowKey="id"
      />
    </div>
  );
}
