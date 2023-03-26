import './global.css';
import { useState } from 'react';
import Input from './Input';
import Select from './Select';
import Chart from './Chart';
import axios from 'axios';

const App = () => {

  const [data, setData] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const getInfo = () => {
    axios.get('http://localhost:3001/api/spent_table', {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    })
      .then((response) => {
        setData(response.data);
        setShowChart(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='text-center'>
      <h1 className="text-3xl font-bold my-6">Accounting table</h1>
      <Input setData={setData} />
      <Select
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        getInfo={getInfo}
      />
      {showChart && <Chart data={data} />}
    </div>
  );
}

export default App;
