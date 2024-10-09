import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { Pie, Line, Bar, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BarElement,
  RadialLinearScale,
} from "chart.js";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "../../shadCn/components/card";

import { doGetUserList } from "../../firebase/auth";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BarElement,
  RadialLinearScale
);

const Dashboard = () => {

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [chartData, setChartData] = useState({
    barData: {},
    radarData: {},
    lineData: {},
  });
  const colors = {
    popover: "#6d28d9",
    popoverForeground: "#f9fafb",
  };
  const lineOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: true,
  };

  const radarOptions = {
    scales: {
      r: {
        beginAtZero: true,
        label: {
          font: {
            size: 16,
          },
        },
        ticks: {
          font: {
            size: 16,
          },
        },
        grid: {
          borderWidth: 1,
          color: "grey",
        },
        angleLines: {
          color: colors.popoverForeground,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16,
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  const refreshData = async () => {
    setLoading(true);
    const userList = await doGetUserList();
    setUserData(userList);
    setLoading(false);
  };

  const prepareChartData = () => {
    if (!userData.length) return { barData: {}, radarData: {}, lineData: {} };
    const monthlySignups = Array(12).fill(0);
    const countryCounts = {};
    console.log(userData, "userData");
    userData.forEach((user) => {
      if (user.createdAt && user.createdAt.seconds) {
        const date = new Date(user.createdAt.seconds * 1000);
        const month = date.getMonth();
        if (month >= 0 && month < 12) {
          monthlySignups[month]++;
        }
      }

      const country = user.country || "Unknown";
      countryCounts[country] = (countryCounts[country] || 0) + 1;
    });

    const barData = {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Monthly Signups",
          backgroundColor: colors.popover,
          borderWidth: 1,
          hoverBackgroundColor: colors.popoverForeground,
          data: monthlySignups,
        },
      ],
    };

    const radarData = {
      labels: Object.keys(countryCounts),
      datasets: [
        {
          label: "Geographic Distribution",
          data: Object.values(countryCounts),
          backgroundColor: colors.popoverForeground,
          borderColor: colors.popover,
          borderWidth: 2,
        },
      ],
    };

    const lineData = {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Growth Over Time",
          fill: false,
          lineTension: 0.1,
          backgroundColor: colors.popoverForeground,
          borderColor: colors.popover,
          borderCapStyle: "butt",
          borderWidth: 2,
          data: monthlySignups,
        },
      ],
    };

    return { barData, radarData, lineData };
  };

  useEffect(() => {
    const storedUsers = localStorage.getItem("userList");
    if (storedUsers) {
      setUserData(JSON.parse(storedUsers));
    }
    refreshData();
  }, []);

  useEffect(() => {
    const { barData, radarData, lineData } = prepareChartData();
    setChartData({ barData, radarData, lineData });
  }, [userData]);

  const { barData, radarData, lineData } = chartData;
  return (
    <div className="w-full text-center">
      <div className="grid h-full grid-cols-1 sm:grid-cols-2 gap-5 max-w-[100%] mx-auto">
    
        <Card className="shadow-lg flex flex-col justify-around ">
          <CardHeader className="mb-auto">
            <CardTitle className="text-lg font-semibold text-foreground ">
              Bar Chart
            </CardTitle>
          </CardHeader>
          <CardContent>
            {barData.labels ? (
              <Bar data={barData} height={250} />
            ) : (
              <p>No data available</p>
            )}
          </CardContent>
        </Card>

       
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Radar Chart
            </CardTitle>
          </CardHeader>
          <CardContent className="flex max-h-[400px] justify-center">
            {radarData.labels ? (
              <Radar data={radarData} options={radarOptions} />
            ) : (
              <p>No data available</p>
            )}
          </CardContent>
        </Card>

  
        <Card className="col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Line Chart
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lineData.labels ? (
              <Line data={lineData} options={lineOptions} height={120} />
            ) : (
              <p>No data available</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
