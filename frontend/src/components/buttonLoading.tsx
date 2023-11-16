import { PacmanLoader } from "react-spinners";

export const ButtonLoading = () => {
  return (
    <div
      style={{
        border: "2px solid #fff",
        borderRadius: "30px",
        padding: "14px 40px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <PacmanLoader color="#fff" size={15} />
    </div>
  );
};
