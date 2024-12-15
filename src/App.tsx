import { Header } from "./components/Layout/Header";
import { TITLE } from "./config/header.config";
import { Dashboard } from "./containers/Dashboard";

const App = () => {
  return (
    <div className="container m-auto p-4 scroll-smooth focus:scroll-auto">
      <Header title={TITLE} />
      <Dashboard />
    </div>
  );
};

export default App;
