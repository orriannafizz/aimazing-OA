import { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Alert, AlertTitle } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
const Input = (props) => {
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(dayjs());
    const [showAlert, setShowAlert] = useState(false);
    const [success, setSuccess] = useState(true);
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
                setShowAlert(true);
                setSuccess(true);
                console.log(showAlert);
                setAmount('');
                document.getElementById('amountInput').value = '';
                props.getInfo();
            })
            .catch((error) => {
                setSuccess(false);
                setShowAlert(true);

            });
    };
    return (
        <div className="mx-10">
            <label className="block text-gray-700 font-bold mb-2">INSERT</label>

            {showAlert && (
                <div className="absolute bottom-0 right-0 m-4 p-4 rounded">
                    <Alert
                        className='text-left'
                        severity={success ? 'success' : 'error'}
                        onClose={() => setShowAlert(false)}

                    >
                        <AlertTitle >
                            {success ? 'SUCCESS!!!' : 'FAILED!!!'}
                        </AlertTitle>
                    </Alert>
                </div>
            )
            }
            <TextField
                id="amountInput"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="shadow w-96"
                label="SPENT"

            />
            <div className="mt-4">
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker className='w-96 mt-10 shadow'
                        onChange={(e) => {
                            setDate(e);
                            console.log(e);
                        }}
                        value={date}
                        id="dateInput"
                        label="DATE"
                    />
                </LocalizationProvider>
            </div>


            <div className="mt-4">

                <Button variant="outlined"
                    onClick={submit}>
                    Submit
                </Button>
            </div>
        </div >
    );
}

export default Input;
