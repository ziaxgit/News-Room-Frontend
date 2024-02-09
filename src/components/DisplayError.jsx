import { useNavigate } from "react-router-dom";

export default function DisplayError({ error }) {
  const navigate = useNavigate();
  return (
    <div className="error-page">
      <h1>ERROR</h1>
      <br />
      <h1>
        {error?.status ? `Status ${error.status}` : "Something went wrong :("}
      </h1>
      <h1>{error?.data?.message && error.data.message}</h1>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Homepage
      </button>
    </div>
  );
}
