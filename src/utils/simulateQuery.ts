export const simulateQueryExecution = (
  query: { data: Record<string, string | number>[] },
  setProgress: (progress: number) => void,
  onComplete: () => void
) => {
  const baseDelay = query.data.length < 100 ? 1000 : 5000; // 1s for small, 5s for large
  const randomVariation = Math.random() * 2000; // Add randomness for realism
  const totalDelay = baseDelay + randomVariation;

  let currentProgress = 0;
  const interval = setInterval(() => {
    currentProgress += 10;
    setProgress(Math.min(currentProgress, 100));
  }, totalDelay / 10);

  const timeout = setTimeout(() => {
    clearInterval(interval);
    onComplete();
  }, totalDelay);

  return () => {
    clearInterval(interval);
    clearTimeout(timeout);
  };
};
