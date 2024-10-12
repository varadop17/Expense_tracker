import { Table, Input } from "antd";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

function TransactionsTable({ transactions }) {
    const [search, setSearch] = useState("");

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            filters: [
                { text: "Income", value: "income" },
                { text: "Expense", value: "expense" },
            ],
            onFilter: (value, record) => record.type === value,
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            sorter: (a, b) => new Date(a.date) - new Date(b.date),
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            sorter: (a, b) => a.amount - b.amount,
            render: (amount, record) => (
                <span style={{ color: record.type === "expense" ? "red" : "green" }}>
                    {record.type === "expense" ? "-" : "+"}₹{Math.abs(amount).toFixed(2)}
                </span>
            ),
        },
        {
            title: "Tag",
            dataIndex: "tag",
            key: "tag",
        },
    ];

    const filteredTransactions = transactions.filter((item) =>
        Object.values(item).some(
            value => 
                value &&
                value.toString().toLowerCase().includes(search.toLowerCase())
        )
    );

    return (
        <div style={{ padding: "20px" }}>
            <Input
                placeholder="Search transactions"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: 16 }}
                prefix={<SearchOutlined />}
            />
            <Table
                dataSource={filteredTransactions}
                columns={columns}
                rowKey="id" // Assuming each transaction has a unique 'id'
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
}

export default TransactionsTable;