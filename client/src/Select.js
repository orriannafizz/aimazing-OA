import React from 'react';

function Select(props) {
    const { startDate, setStartDate, endDate, setEndDate, getInfo } = props;
    const formatDate = (date) => {
        return date.toISOString().slice(0, 10);
    };
    return (
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
        </div>
    );
}

export default Select;
