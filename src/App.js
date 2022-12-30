import EModulelists from "./components/EModulelists";
import GlobalProvider from "./context/GlobalState";
import "./App.css";

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <div className="container module-container">
          <EModulelists />
        </div>
      </div>
    </GlobalProvider>
  );
}

export default App;
