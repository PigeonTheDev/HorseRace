import "./App.css";
import { AppWrapper } from "./AppWrapper";
import { useRace } from "./Hooks/useRace";

function App() {
  const race = useRace();

  return (
    <div className="App">
      <AppWrapper />
    </div>
  );
}

export default App;
