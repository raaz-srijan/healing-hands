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

interface AppointmentsChartProps {
    data?: Record<string, number>;
}

export const AppointmentsChart = ({ data: appointmentData }: AppointmentsChartProps) => {
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

  // Default structure if no data
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const values = labels.map(day => appointmentData ? appointmentData[day] || 0 : 0);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Appointments",
        data: values,
        borderColor: "#0284c7",
        backgroundColor: "rgba(2, 132, 199, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
        color: isDark ? '#f1f5f9' : '#1e293b' // slate-100 : slate-800
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: isDark ? '#94a3b8' : '#64748b' // slate-400 : slate-500
        },
        grid: {
            color: isDark ? '#334155' : '#e2e8f0' // slate-700 : slate-200
        }
      },
      x: {
        ticks: {
          color: isDark ? '#94a3b8' : '#64748b'
        },
        grid: {
            display: false
        }
      }
    },
  };

  return <div className="h-full w-full"><Line options={options} data={chartData} /></div>;
};

interface PatientFlowChartProps {
    data?: { month: string; newPatients: number; discharged: number }[];
}

export const PatientFlowChart = ({ data: flowData }: PatientFlowChartProps) => {
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

  const labels = flowData ? flowData.map(d => d.month) : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "New Patients",
        data: flowData ? flowData.map(d => d.newPatients) : [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "#0f766e", 
      },
      {
        label: "Discharged",
        data: flowData ? flowData.map(d => d.discharged) : [28, 48, 40, 19, 86, 27, 90],
        backgroundColor: "#cbd5e1",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: isDark ? '#e2e8f0' : '#475569' // slate-200 : slate-600
        }
      },
      title: {
        display: true,
        text: "Patient Flow Statistics",
        font: {
            size: 16,
            weight: 'bold' as 'bold'
        },
        color: isDark ? '#f1f5f9' : '#1e293b'
      },
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              color: isDark ? '#94a3b8' : '#64748b'
            },
            grid: {
                color: isDark ? '#334155' : '#e2e8f0'
            }
        },
        x: {
            ticks: {
              color: isDark ? '#94a3b8' : '#64748b'
            },
            grid: {
                display: false
            }
        }
    }
  };

  return <div className="h-full w-full"><Bar options={options} data={chartData} /></div>;
};

