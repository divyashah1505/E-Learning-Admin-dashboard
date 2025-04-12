import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from "chart.js";

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

// Sample data for charts
const salesData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Sales",
      data: [10, 20, 30, 40, 50],
      borderColor: "blue",
      backgroundColor: "rgba(89, 89, 128, 0.2)",
    },
  ],
};

const barChartData = {
  labels: ["Product A", "Product B", "Product C"],
  datasets: [
    {
      label: "Revenue",
      data: [300, 500, 700],
      backgroundColor: ["red", "green", "blue"],
    },
  ],
};

const pieChartData = {
  labels: ["Electronics", "Clothing", "Groceries"],
  datasets: [
    {
      data: [40, 30, 30],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};

// Individual chart components
export const LineChart = () => <Line data={salesData} />;
export const BarChart = () => <Bar data={barChartData} />;
export const CircleChart = () => <Pie data={pieChartData} />;
export const SalesValueChart = () => {
  // Your chart logic here
};

export const SalesValueChartphone = () => {
  // Your chart logic here
};


// Default export (Optional, if you need a default chart)
export default LineChart;
