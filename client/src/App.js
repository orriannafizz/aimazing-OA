import './global.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
function App() {

  const [amount, setAmount] = useState('');
  const [showChart, setShowChart] = useState(false);
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);

  const formatDate = (date) => {
    return date.toISOString().slice(0, 10);
  };
  useEffect(() => {
    console.log(data.length);
  }, [data])

  const formatData = (data) => {
    const formattedData = data.map((row) => ({
      name: new Date(row.spent_date).toLocaleDateString(),
      amount: row.amount,
    }));
    return formattedData;
  };

  const getInfo = () => {
    axios.get('http://localhost:3001/api/spent_table', {
      params: {
        startDate: startDate,
        endDate: endDate,
      },
    }
    )
      .then((response) => {
        setData(response.data);
        setShowChart(true);
      })
      .catch((error) => {
        console.log(error);
      });

  }
  const submit = () => {
    axios.post('http://localhost:3001/api/insert', {
      amount: amount,
      date: formatDate(date)
    })
      .then(() => {
        console.log("Success");
        alert("Success");
        setAmount('');
      })
      .catch((error) => {
        alert("INPUT CAN'T BE EMPTY!!");
      });
  }

  return (
    <div className='text-center'>
      <h1 className="text-3xl font-bold my-6">Accounting table</h1>
      <div className="mx-10">
        <label className="block text-gray-700 font-bold mb-2">Spent</label>
        <input className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="amount"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}

          id="amountInput"
        />
        <label className="block text-gray-700 font-bold mb-2">Date</label>
        <input className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="date"
          name="date"
          onChange={(e) => setDate(new Date(e.target.value))}
          value={formatDate(date)}
          id="dateInput" />

        <div className="mt-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={submit}
          >Submit</button>

        </div>
      </div>
      <div>
        <div className="mx-10">
          <label className="block text-gray-700 font-bold mb-2">Start Date</label>

          <input className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            name="startDate"
            onChange={(e) => setStartDate(new Date(e.target.value))}
            value={formatDate(startDate)}
            id="startDateInput" />
          <label className="block text-gray-700 font-bold mb-2">End Date</label>

          <input className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            name="endDate"
            onChange={(e) => setEndDate(new Date(e.target.value))}
            value={formatDate(endDate)}
            id="endDateInput" />
          <div className="mt-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-20 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={getInfo}
            >Get</button>
          </div>
        </div>
        {showChart && (
          <div className="mx-10 my-6 overflow-x-scroll">
            <ResponsiveContainer width={200 * data.length} height={400}>
              <BarChart data={formatData(data)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

        )}

      </div>
    </div >


  );
}

export default App;
