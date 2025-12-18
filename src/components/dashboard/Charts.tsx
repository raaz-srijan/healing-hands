import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const AppointmentsChart = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Appointments",
        data: [12, 19, 15, 25, 22, 10, 5],
        borderColor: "#0284c7",
        backgroundColor: "rgba(2, 132, 199, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Appointments per Day",
        font: {
            size: 16,
            weight: 'bold' as 'bold'
        }, 
        color: isDark ? '#ffffff' : '#1f2937'
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280'
        },
        grid: {
            color: isDark ? '#374151' : '#f3f4f6'
        }
      },
      x: {
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280'
        },
        grid: {
            display: false
        }
      }
    },
  };

  return <Line options={options} data={data} />;
};

export const PatientFlowChart = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "New Patients",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "#0f766e", 
      },
      {
        label: "Discharged",
        data: [28, 48, 40, 19, 86, 27, 90],
        backgroundColor: "#cbd5e1",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: isDark ? '#e5e7eb' : '#374151'
        }
      },
      title: {
        display: true,
        text: "Patient Flow Statistics",
        font: {
            size: 16,
            weight: 'bold' as 'bold'
        },
        color: isDark ? '#ffffff' : '#1f2937'
      },
    },
    scales: {
        y: {
            ticks: {
              color: isDark ? '#9ca3af' : '#6b7280'
            },
            grid: {
                color: isDark ? '#374151' : '#f3f4f6'
            }
        },
        x: {
            ticks: {
              color: isDark ? '#9ca3af' : '#6b7280'
            },
            grid: {
                display: false
            }
        }
    }
  };

  return <Bar options={options} data={data} />;
};

