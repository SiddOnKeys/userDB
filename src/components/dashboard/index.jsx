import React, { useEffect } from "react";
import { useAuth } from "../../contexts/authContext";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";

// Register the required components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);

const Dashboard = () => {
  const { currentUser } = useAuth();

  // Dummy data for charts
  const pieData1 = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const pieData2 = {
    labels: ["Green", "Purple", "Orange"],
    datasets: [
      {
        data: [200, 150, 100],
        backgroundColor: ["#4BC0C0", "#9966FF", "#FF9F40"],
        hoverBackgroundColor: ["#4BC0C0", "#9966FF", "#FF9F40"],
      },
    ],
  };

  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "#36A2EB",
        borderCapStyle: "butt",
        borderWidth: 2,
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  const lineOptions = {
    // maintainAspectRatio: false,
    // height: "300px",
    // aspectRatio: 16 | 9,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full text-center">
      <h1 className="text-3xl font-bold mb-6">
        Hello{" "}
        {currentUser.displayName ? currentUser.displayName : currentUser.email},
        you are now logged in.
      </h1>

      <div className="grid grid-cols-2 gap-5 max-w-[80%] mx-auto">
        <div className="w-full shadow-card p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">
            Pie Chart 1
          </h2>
          <Pie
            data={pieData1}
            options={{
            //   width: 250,
              height: 250,
            }}
          />
        </div>

        {/* Pie Chart 2 */}
        <div className="w-full shadow-card p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">
            Pie Chart 2
          </h2>
          <Pie data={pieData2} width={250} height={250} />
        </div>

        <div className="col-span-2 shadow-card p-4 rounded-lg">
          <div className="w-full mx-auto">
            <h2 className="text-lg font-semibold text-blue-600 mb-2">
              Line Chart
            </h2>
            <Line
              data={lineData}
              options={lineOptions}
              width={800}
              height={350}
            />
          </div>
        </div>
      </div>

      {/* <div className="flex  justify-center gap-4 mb-6">
        <div className="w-full">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">
            Pie Chart 1
          </h2>
          <Pie data={pieData1} width={"100%"} />
        </div>

        <div className="w-full">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">
            Pie Chart 2
          </h2>
          <Pie data={pieData2} width={"100%"} />
        </div>
      </div> */}

      {/* Line Chart */}
      {/* <div className="w-full max-w-2xl">
        <h2 className="text-lg font-semibold text-blue-600 mb-2">Line Chart</h2>
        <Line
          data={lineData}
          options={lineOptions}
          width={"100%"}
          height={400}
        />
      </div> */}
    </div>
  );
};

export default Dashboard;
