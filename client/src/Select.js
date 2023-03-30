import React from 'react';
import { Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro';

function Select(props) {
    const { setStartDate, setEndDate, getInfo, setShowChart } = props;

    const handler = () => {
        setShowChart(true);
        getInfo();
    }

    return (
        <div>
            <div className="mx-10">
                <label className="block text-gray-700 font-bold mb-3">SHOW DATA</label>

                <div className="mt-10">
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DateRangePicker
                            onChange={(e) => {
                                setStartDate(e[0]);
                                setEndDate(e[1]);
                            }}

                        />

                    </LocalizationProvider>
                </div>
                <div className="mt-[60px]">

                    <Button variant="outlined" onClick={handler}>
                        Show
                    </Button>
                </div>
            </div>


        </div>
    );
}

export default Select;
