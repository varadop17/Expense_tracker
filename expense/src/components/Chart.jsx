import React, { useState, useEffect } from 'react';
import { Column, Pie } from '@ant-design/plots';
import { Card, Row, Col, Layout, Typography } from 'antd';
import moment from 'moment';

const { Content } = Layout;
const { Title } = Typography;

const FinancialChartsComponent = ({ transactions }) => {
  const [monthlySpendingData, setMonthlySpendingData] = useState([]);
  const [spendingData, setSpendingData] = useState([]);

  useEffect(() => {
    if (transactions.length > 0) {
      const { monthlySpendingData, spendingDataArray } = processChartData(transactions);
      setMonthlySpendingData(monthlySpendingData);
      setSpendingData(spendingDataArray);
    }
  }, [transactions]);

  const processChartData = (transactions) => {
    const monthlySpending = {};
    const spendingData = {};
    
    transactions.forEach((transaction) => {
      if (transaction.type === "expense") {
        const monthYear = moment(transaction.date).format("MMM YYYY");
        const tag = transaction.tag;
        
        // Monthly Spending Data
        if (monthlySpending[monthYear]) {
          monthlySpending[monthYear] += transaction.amount;
        } else {
          monthlySpending[monthYear] = transaction.amount;
        }
        
        // Spending by Category Data
        if (spendingData[tag]) {
          spendingData[tag] += transaction.amount;
        } else {
          spendingData[tag] = transaction.amount;
        }
      }
    });

    const monthlySpendingDataArray = Object.entries(monthlySpending)
      .map(([month, amount]) => ({
        month,
        spending: amount
      }))
      .sort((a, b) => moment(a.month, "MMM YYYY").diff(moment(b.month, "MMM YYYY")));

    const spendingDataArray = Object.keys(spendingData).map((key) => ({
      category: key,
      value: spendingData[key],
    }));

    return { monthlySpendingData: monthlySpendingDataArray, spendingDataArray };
  };

  const monthlySpendingChartConfig = {
    data: monthlySpendingData,
    xField: 'month',
    yField: 'spending',
    color: '#1890ff',
    label: {
      position: 'top',
      style: {
        fill: '#000000',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      month: {
        alias: 'Month',
      },
      spending: {
        alias: 'Spending',
        formatter: (v) => `$${v.toFixed(2)}`,
      },
    },
  };

  const spendingChartConfig = {
    data: spendingData,
    angleField: 'value',
    colorField: 'category',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} ${value}',
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  return (
    <Layout>
      <Content style={{ padding: '0 50px' }}>
        <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
          <Col span={12}>
            <Card>
              <Title level={4}>Monthly Spending</Title>
              {monthlySpendingData.length > 0 ? (
                <Column {...monthlySpendingChartConfig} />
              ) : (
                <p>No monthly spending data available</p>
              )}
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Title level={4}>Spending by Category</Title>
              {spendingData.length > 0 ? (
                <Pie {...spendingChartConfig} />
              ) : (
                <p>No spending data available</p>
              )}
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default FinancialChartsComponent;