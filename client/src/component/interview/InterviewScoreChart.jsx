import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

const InterviewScoreChart = ({ scores }) => {

    const data = [
        {
            name: "Overall",
            score: scores.overallScore,
        },
        {
            name: "Technical",
            score: scores.technicalScore,
        },
        {
            name: "Communication",
            score: scores.communicationScore,
        },
        {
            name: "Confidence",
            score: scores.confidenceScore,
        },
    ];

    return (
        <div className="chart-section">

            <h3>Interview Score Analysis</h3>

            <ResponsiveContainer
                width="100%"
                height={300}
            >
                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />

                    <YAxis
                        domain={[0, 10]}
                    />

                    <Tooltip />

                    <Bar
                        dataKey="score"
                        fill="#2563eb"
                        radius={[8, 8, 0, 0]}
                    />

                </BarChart>
            </ResponsiveContainer>

        </div>
    );
};

export default InterviewScoreChart;