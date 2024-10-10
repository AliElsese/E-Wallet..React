import { useEffect, useRef, useState } from 'react';

export default function App() {
  const balanceInput = useRef();
  const [balance, setBalance] = useState(0);
  const [singleTransaction, setSingleTransaction] = useState({});
  const [transactions, setTransactions] = useState([]);

  const increamentBalance = () => {
    setSingleTransaction({
      balanceBefore: balance,
      transaction: 'Deposite',
      amount: Number(balanceInput.current.value),
      balanceAfter: balance + Number(balanceInput.current.value)
    })
    setBalance(balance + Number(balanceInput.current.value));
  }

  const decreamentBalance = () => {
    if(balance < +balanceInput.current.value) {
      alert(`Your balance can't accept transaction`);
    }
    else {
      setSingleTransaction({
        balanceBefore: balance,
        transaction: 'Withdraw',
        amount: Number(balanceInput.current.value),
        balanceAfter: balance - Number(balanceInput.current.value)
      })
      setBalance(balance - Number(balanceInput.current.value));
    }
  }

  const deleteTransaction = () => {
    let transactionsTable = [...transactions];
    setBalance(transactionsTable[transactionsTable.length - 1].balanceBefore);
    transactionsTable.pop();
    setTransactions(transactionsTable);
  }

  useEffect(() => {
    if(Object.keys(singleTransaction).length !== 0) {
      let transactionsTable = [...transactions];
      transactionsTable.push(singleTransaction);
      setTransactions(transactionsTable);
      balanceInput.current.value = "";
      setSingleTransaction({});
    }
  }, [balance]);

  return (
    <div>
      <div className='col-12 d-flex justify-content-center align-items-center gap-3 p-3 bg-info'>
        <input className='form-control w-25' type="text" ref={balanceInput} />
        <p className=''>
          Balnce is: {balance}
        </p>
      </div>
      <div className='col-12 d-flex justify-content-center gap-3 p-3 bg-success'>
        <button className='btn btn-primary' onClick={increamentBalance}>deposite</button>
        <button className='btn btn-danger' onClick={decreamentBalance}>withdraw</button>
      </div>
      <div className='col-12 d-flex gap-3'>
        <table className='table table-dark table-bordered'>
          <thead>
            <tr>
              <th>-</th>
              <th>blance before</th>
              <th>transaction</th>
              <th>amount</th>
              <th>balance after</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {
              // transactions
              transactions.map((el, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{el.balanceBefore}</td>
                    <td><p className={`btn btn-${el.transaction == 'Deposite' ? 'primary' : 'danger'}`}>{el.transaction}</p></td>
                    <td>{el.transaction == 'Deposite' ? '+' : '-'}{el.amount}</td>
                    <td>{el.balanceAfter}</td>
                    <td>{transactions.length - 1 == index ? <button className='btn btn-warning' onClick={deleteTransaction}>Del</button> : null}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
