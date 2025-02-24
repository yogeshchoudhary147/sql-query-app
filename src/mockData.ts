export const mockData1 = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  age: 20 + (i % 30),
  location: `City ${i % 100}`,
}));

export const mockData2 = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `Client ${i + 1}`,
  email: `client${i + 1}@example.com`,
  age: 25 + (i % 30),
  location: `Town ${i % 100}`,
}));
