import { BrowserRouter } from "react-router-dom";
import Routers from "./routes";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </div>
  );
};

export default App;
