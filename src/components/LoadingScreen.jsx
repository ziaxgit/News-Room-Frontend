import { Hourglass } from "react-loader-spinner";
import "../styles/LoadingScreen.css";

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperClass=""
        colors={["#575757", "#949494"]}
      />
      <p>Fetching data from API please wait...</p>
    </div>
  );
}
