import "./App.css";
import { AppWrapper } from "./Components/AppWrapper/AppWrapper";
import { useRace } from "./Hooks/useRace";

function App() {
  const race = useRace();
  return (
    <div className="App">
      <AppWrapper race={race} />
    </div>
  );
}

export default App;
