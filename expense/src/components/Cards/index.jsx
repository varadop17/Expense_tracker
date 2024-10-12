import Button from "../Button";
import "./card.css"
import {Card, Row} from "antd"

function Cards({income, expenses, totalBalance, showExpenseModal, showIncomeModal}) {
  console.log("Expenses value:", expenses); // Updated debugging line

  return (
    <Row className="my-row">
      <Card bordered={true} className="my-card">
        <h2>Current Balance</h2>
        <p>₹{totalBalance}</p>
        <Button text="Reset Balance" blue={true}/>
      </Card>

      <Card bordered={true} className="my-card">
        <h2>Total Income</h2>
        <p>₹{income}</p>
        <Button text="Add Income" blue={true} onClick={showIncomeModal}/>
      </Card>

      <Card bordered={true} className="my-card">
        <h2>Total Expenses</h2>
        <p>₹{expenses}</p>
        <Button text="Add Expense" blue={true} onClick={showExpenseModal}/>
      </Card>
    </Row>
  );
}

export default Cards;