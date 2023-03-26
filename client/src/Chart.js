import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

const Chart = ({ data }) => {

    const formatData = (data) => {
        const formattedData = data.map((row) => ({
            name: new Date(row.spent_date).toLocaleDateString(),
            amount: row.amount,
        }));
        return formattedData;
    };

    return (
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
    );
};

export default Chart;
