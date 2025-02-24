import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Query } from "../types";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DataVisualizationProps {
  query: Query;
}

export const DataVisualization: React.FC<DataVisualizationProps> = ({
  query,
}) => {
  let chartData;
  let options;

  // Handle different queries dynamically
  if (query.id === 2) {
    // Top-Selling Products (Query 2)
    chartData = {
      labels: query.data.map((row: Record<string, string | number>) => row.ProductName as string),
      datasets: [
        {
          label: "Total Sales ($)",
          data: query.data.map((row: Record<string, string | number>) => row.TotalSales as number),
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Total Quantity Sold",
          data: query.data.map((row: Record<string, string | number>) => row.TotalQuantity as number),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    };

    options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top" as const,
          labels: {
            color: "gray"
          },
        },
        title: {
          display: true,
          text: query.title,
          color: "gray"
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "gray"
          },
          title: {
            display: true,
            text: 'Sales ($)',
            color: "gray"
          }
        },
        x: {
          ticks: {
            color: "gray"
          },
          title: {
            display: true,
            text: "Product Name",
            color: "gray"
          }
        }
      },
    };
  } else if (query.id === 3) {
    // Product Inventory (Query 3)
    chartData = {
      labels: query.data
        .slice(0, 10)
        .map((row: Record<string, string | number>) => row.product as string), // Limit to 10 for performance
      datasets: [
        {
          label: "Price ($)",
          data: query.data
            .slice(0, 10)
            .map((row: Record<string, string | number>) => row.price as number),
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Stock Level",
          data: query.data
            .slice(0, 10)
            .map((row: Record<string, string | number>) => row.stock as number),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    };

    options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top" as const,
          labels: {
            color: "gray"
          },
        },
        title: {
          display: true,
          text: query.title,
          color: "gray"
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "gray"
          },
          title: {
            display: true,
            text: 'Price ($)',
            color: "gray"
          }
        },
        x: {
          ticks: {
            color: "gray"
          },
          title: {
            display: true,
            text: "Product Name",
            color: "gray"
          }
        }
      },
    };
  } else if (query.id === 4) {
    // Daily Sales Metrics (Query 4)
    chartData = {
      labels: query.data.map((row: Record<string, string | number>) => row.Date as string),
      datasets: [
        {
          label: "Daily Revenue ($)",
          data: query.data.map((row: Record<string, string | number>) => row.DailyRevenue as number),
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
          yAxisID: 'y'
        },
        {
          label: "Order Count",
          data: query.data.map((row: Record<string, string | number>) => row.OrderCount as number),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          yAxisID: 'y1'
        },
        {
          label: "Unique Customers",
          data: query.data.map((row: Record<string, string | number>) => row.UniqueCustomers as number),
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          yAxisID: 'y1'
        }
      ]
    };

    options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top" as const,
          labels: {
            color: "gray"
          },
        },
        title: {
          display: true,
          text: query.title,
          color: "gray"
        },
      },
      scales: {
        y: {
          type: 'linear' as const,
          display: true,
          position: 'left' as const,
          title: {
            display: true,
            text: 'Revenue ($)',
            color: "gray"
          },
          ticks: {
            color: "gray"
          }
        },
        y1: {
          type: 'linear' as const,
          display: true,
          position: 'right' as const,
          title: {
            display: true,
            text: 'Count',
            color: "gray"
          },
          ticks: {
            color: "gray"
          },
          grid: {
            drawOnChartArea: false
          }
        },
        x: {
          title: {
            display: true,
            text: "Date",
            color: "gray"
          },
          ticks: {
            color: "gray"
          }
        }
      },
    };
  } else if (query.id === 1) {
    // Customer Orders Summary (Query 1)
    chartData = {
      labels: query.data.map((row: Record<string, string | number>) => row.CompanyName as string),
      datasets: [
        {
          label: "Number of Orders",
          data: query.data.map((row: Record<string, string | number>) => row.OrderCount as number),
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        }
      ]
    };

    options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top" as const,
          labels: {
            color: "gray"
          }
        },
        title: {
          display: true,
          text: query.title,
          color: "gray"
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "gray"
          },
          title: {
            display: true,
            text: 'Number of Orders',
            color: "gray"
          }
        },
        x: {
          ticks: {
            color: "gray"
          },
          title: {
            display: true,
            text: "Company Name",
            color: "gray"
          }
        }
      }
    };
  } else if (query.id === 5) {
    // Monthly Sales Analysis (Query 5)
    chartData = {
      labels: query.data.map((row: Record<string, string | number>) => row.Month as string),
      datasets: [
        {
          label: "Total Revenue ($)",
          data: query.data.map((row: Record<string, string | number>) => row.TotalRevenue as number),
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
          yAxisID: 'y'
        },
        {
          label: "Total Orders",
          data: query.data.map((row: Record<string, string | number>) => row.TotalOrders as number),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          yAxisID: 'y1'
        },
        {
          label: "Average Order Value ($)",
          data: query.data.map((row: Record<string, string | number>) => row.AverageOrderValue as number),
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          yAxisID: 'y2'
        }
      ]
    };

    options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top" as const,
          labels: {
            color: "gray"
          }
        },
        title: {
          display: true,
          text: query.title,
          color: "gray"
        }
      },
      scales: {
        y: {
          type: 'linear' as const,
          display: true,
          position: 'left' as const,
          title: {
            display: true,
            text: 'Revenue ($)',
            color: "gray"
          },
          ticks: {
            color: "gray"
          }
        },
        y1: {
          type: 'linear' as const,
          display: true,
          position: 'right' as const,
          title: {
            display: true,
            text: 'Order Count',
            color: "gray"
          },
          ticks: {
            color: "gray"
          },
          grid: {
            drawOnChartArea: false
          }
        },
        y2: {
          type: 'linear' as const,
          display: true,
          position: 'right' as const,
          title: {
            display: true,
            text: 'Avg Order Value ($)',
            color: "gray"
          },
          ticks: {
            color: "gray"
          },
          grid: {
            drawOnChartArea: false
          }
        },
        x: {
          ticks: {
            color: "gray"
          },
          title: {
            display: true,
            text: "Month",
            color: "gray"
          }
        }
      }
    };
  } else {
    return null; // No visualization for Query 1 (simpler data)
  }

  // Default options if not set specifically for the query
  if (!options) {
    options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top" as const,
          labels: {
            color: "gray"
          }
        },
        title: {
          display: true,
          text: "Query Data Visualization",
          color: "gray"
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "gray"
          }
        },
        x: {
          ticks: {
            color: "gray"
          }
        }
      }
    };
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 transition-all duration-200 hover:shadow-lg">
      <Bar data={chartData} options={options} height={400} />
    </div>
  );
};
