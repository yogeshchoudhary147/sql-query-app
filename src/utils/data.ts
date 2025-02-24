import { Query } from "../types";

export const generateLargeData = (
  count: number
): Record<string, string | number>[] => {
  const data: Record<string, string | number>[] = [];
  for (let i = 1; i <= count; i++) {
    data.push({
      id: i,
      product: `Product ${i}`,
      price: Math.floor(Math.random() * 1000) + 1, // Price in dollars
      stock: Math.floor(Math.random() * 100), // Units in stock
    });
  }
  return data;
};

// Mock data for Northwind-like queries
export const mockData: Query[] = [
  {
    id: 1,
    text: "SELECT c.CustomerID as id, c.CompanyName, c.Country, COUNT(o.OrderID) as OrderCount FROM customers c LEFT JOIN orders o ON c.CustomerID = o.CustomerID WHERE c.Country = 'Germany' GROUP BY c.CustomerID, c.CompanyName, c.Country ORDER BY OrderCount DESC LIMIT 10",
    title: "Top German Customers by Order Count",
    data: [
      {
        id: "ALFKI",
        CompanyName: "Alfreds Futterkiste",
        Country: "Germany",
        OrderCount: 12,
      },
      {
        id: "BLAUS",
        CompanyName: "Blauer See Delikatessen",
        Country: "Germany",
        OrderCount: 8,
      },
      {
        id: "DRACD",
        CompanyName: "Drachenblut Delikatessen",
        Country: "Germany",
        OrderCount: 6,
      },
      {
        id: "FRANK",
        CompanyName: "Frankenversand",
        Country: "Germany",
        OrderCount: 5,
      },
      {
        id: "KONOP",
        CompanyName: "Königlich Essen",
        Country: "Germany",
        OrderCount: 4,
      },
      {
        id: "MEREP",
        CompanyName: "Merep GmbH",
        Country: "Germany",
        OrderCount: 3,
      },
      {
        id: "RATTC",
        CompanyName: "Rattlesnake Co.",
        Country: "Germany",
        OrderCount: 2,
      },
      {
        id: "WOLZA",
        CompanyName: "Wolz & Co.",
        Country: "Germany",
        OrderCount: 1,
      },
      {
        id: "HILAA",
        CompanyName: "Hildegard's",
        Country: "Germany",
        OrderCount: 7,
      },
      {
        id: "MENDL",
        CompanyName: "Mendel's",
        Country: "Germany",
        OrderCount: 15,
      },
      {
        id: "RATTC",
        CompanyName: "Rattlesnake Co.",
        Country: "Germany",
        OrderCount: 10,
      },
      {
        id: "GROSR",
        CompanyName: "GROSR",
        Country: "Germany",
        OrderCount: 11,
      }
    ],
  },
  {
    id: 2,
    text: "SELECT p.ProductName, SUM(od.Quantity) as TotalQuantity, SUM(od.UnitPrice * od.Quantity) as TotalSales FROM products p JOIN [order details] od ON p.ProductID = od.ProductID JOIN orders o ON od.OrderID = o.OrderID WHERE o.OrderDate >= '2023-01-01' AND o.OrderDate <= '2023-12-31' GROUP BY p.ProductName ORDER BY TotalSales DESC LIMIT 10",
    title: "Top Products by Total Sales",
    data: [
      { ProductName: "Chai", TotalQuantity: 150, TotalSales: 4500 },
      { ProductName: "Chang", TotalQuantity: 120, TotalSales: 3600 },
      { ProductName: "Aniseed Syrup", TotalQuantity: 90, TotalSales: 2700 },
      { ProductName: "Tofu", TotalQuantity: 60, TotalSales: 1800 },
      { ProductName: "Pasta", TotalQuantity: 50, TotalSales: 1500 },
      { ProductName: "Curry Powder", TotalQuantity: 40, TotalSales: 1200 },
      { ProductName: "Chocolate", TotalQuantity: 30, TotalSales: 900 },
      { ProductName: "Tea", TotalQuantity: 20, TotalSales: 600 },
      { ProductName: "Coffee", TotalQuantity: 200, TotalSales: 6000 },
      { ProductName: "Syrup", TotalQuantity: 110, TotalSales: 3300 },
      { ProductName: "Honey", TotalQuantity: 95, TotalSales: 2850 },
      { ProductName: "Olive Oil", TotalQuantity: 75, TotalSales: 2250 },
    ],
  },
  {
    id: 3,
    text: "SELECT p.ProductID as id, p.ProductName as product, p.UnitPrice as price, p.UnitsInStock as stock FROM products p WHERE p.UnitsInStock > 0 ORDER BY p.UnitPrice DESC",
    title: "Available Products",
    data: generateLargeData(1000), // Large dataset with realistic product details
  },
  {
    id: 4,
    text: "SELECT DATE_TRUNC('day', o.OrderDate) as Date, COUNT(*) as OrderCount, SUM(od.Quantity * od.UnitPrice) as DailyRevenue, COUNT(DISTINCT c.CustomerID) as UniqueCustomers FROM Orders o JOIN [Order Details] od ON o.OrderID = od.OrderID JOIN Customers c ON o.CustomerID = c.CustomerID WHERE o.OrderDate >= '2024-01-01' GROUP BY DATE_TRUNC('day', o.OrderDate) ORDER BY Date",
    title: "Daily Sales Metrics",
    data: Array.from({ length: 100 }, (_, i) => {
      const date = new Date(2024, 0, i + 1);
      const baseRevenue = 10000 + Math.sin(i * 0.2) * 3000;
      return {
        Date: date.toISOString().split("T")[0],
        OrderCount: Math.floor(20 + Math.sin(i * 0.3) * 10),
        DailyRevenue: Math.floor(baseRevenue + Math.random() * 1000),
        UniqueCustomers: Math.floor(15 + Math.sin(i * 0.25) * 5),
      };
    }),
  },
  {
    id: 5,
    text: "SELECT DATE_TRUNC('month', o.OrderDate) as Month, COUNT(o.OrderID) as TotalOrders, SUM(od.Quantity * od.UnitPrice) as TotalRevenue, AVG(od.UnitPrice) as AverageOrderValue FROM Orders o JOIN [Order Details] od ON o.OrderID = od.OrderID WHERE o.OrderDate >= '2023-01-01' AND o.OrderDate <= '2024-01-01' GROUP BY DATE_TRUNC('month', o.OrderDate) ORDER BY Month",
    title: "Monthly Sales Analysis",
    data: Array.from({ length: 12 * 2 }, (_, i) => {
      const month = new Date(2023, i, 1);
      const totalOrders = Math.floor(500 + Math.sin(i * 0.5) * 200);
      const totalRevenue = totalOrders * (100 + Math.sin(i * 0.3) * 30);
      const averageOrderValue = totalRevenue / totalOrders;

      return {
        Month: month.toISOString().split("T")[0].slice(0, 7), // 'YYYY-MM' format
        TotalOrders: totalOrders,
        TotalRevenue: Math.floor(totalRevenue),
        AverageOrderValue: Math.floor(averageOrderValue),
      };
    }),
  },
];
