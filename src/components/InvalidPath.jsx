import { useNavigate } from "react-router-dom";

export default function InvalidPath() {
  const navigate = useNavigate();
  return (
    <div className="error-page">
      <h1>ERROR</h1>
      <br />
      <h1>You seem lost...</h1>
      <h1>This is not a valid path :/</h1>
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
