import { useNavigate } from "react-router-dom";

export default function DisplayError({ error }) {
  const navigate = useNavigate();
  return (
    <div className="error-page">
      <h1>ERROR</h1>
      <br />
      <h1>Status {error.status}</h1>
      <h1>{error.data.message}</h1>
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
