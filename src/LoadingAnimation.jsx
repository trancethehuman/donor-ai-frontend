const LoadingAnimation = () => {
  return (
    <div
      style={{
        border: "16px solid #f3f3f3",
        borderRadius: "50%",
        borderTop: "16px solid #3498db",
        width: "120px",
        height: "120px",
        animation: "spin 2s linear infinite",
      }}
    />
  );
};

export default LoadingAnimation;
