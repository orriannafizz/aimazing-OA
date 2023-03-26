import { useState } from 'react';
import axios from 'axios';

const Input = (props) => {
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date());

    const formatDate = (date) => {
        return date.toISOString().slice(0, 10);
    };

    const submit = () => {
        axios.post('http://localhost:3001/api/insert', {
            amount: amount,
            date: formatDate(date)
        })
            .then(() => {
                console.log('Success');
                alert('Success');
                setAmount('');
                document.getElementById('amountInput').value = '';
                document.getElementById('dateInput').value = '';
                props.getInfo();
            })
            .catch((error) => {
                alert("INPUT CAN'T BE EMPTY!!");
            });
    };

    return (
        <div className="mx-10">
            <label className="block text-gray-700 font-bold mb-2">Spent</label>
            <input
                className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="amount"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                id="amountInput"
            />
            <label className="block text-gray-700 font-bold mb-2">Date</label>
            <input
                className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="date"
                name="date"
                onChange={(e) => setDate(new Date(e.target.value))}
                value={formatDate(date)}
                id="dateInput"
            />

            <div className="mt-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={submit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default Input;
