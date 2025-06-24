import { useState } from "react";
import { SyncLoader } from "react-spinners";
import "./App.css";
function App() {
  const [name, setName] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleCheckGender(e) {
    e.preventDefault();
    if (!name) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`https://api.genderize.io/?name=${name}`);
      if (!response.ok) {
        throw new Error("Failed to fetch gender");
      }
      const data = await response.json();
      setResult(data);
    } catch (e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <form onSubmit={handleCheckGender}>
        <input
          type="text"
          placeholder="Enter a name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          Check gender
        </button>
      </form>

      {loading && <SyncLoader color="blue" size={15} 
       />}

      {result && (
        <p>
          {result.name} is {result.gender} with{" "}
          {Math.ceil(result.probability * 100)}% probability.
        </p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;


