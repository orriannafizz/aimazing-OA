import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

const Chart = ({ data }) => {

    const formatData = (data) => {
        const formattedData = data.map((row) => ({
            name: new Date(row.spent_date).toLocaleDateString(),
            amount: row.amount,
        }));
        return formattedData;
    };

    return (
        <div className="mx-10 my-6 overflow-x-scroll items-center flex justify-center">
            <BarChart data={formatData(data)} width={150 * data.length} height={400}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default Chart;
