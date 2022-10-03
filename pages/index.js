import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [weatherCodeInput, setWeatherCodeInput] = useState("");
  const [result, setResult] = useState();
  const [timeOfPublish, setTimeOfPublish] = useState();
  const [airportName, setAirportName] = useState("");
  const [resultReceived, setResultReceived] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/weather", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ weatherCode: weatherCodeInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setTimeOfPublish(data.timeOfPublish);
    setResultReceived(true);
    setAirportName(data.airport);
    // setWeatherCodeInput("");
  }

  return (
    <div>
      <Head>
        <title>Flight Weather</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Predict Weather</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="weatherCode"
            placeholder="Enter a weather code"
            value={weatherCodeInput}
            onChange={(e) => setWeatherCodeInput(e.target.value)}
          />
          <input type="submit" value="Generate description" />
        </form>
        {
          resultReceived && 
            <div>
              <div className={styles.result}>Weather Code: {weatherCodeInput}</div>
              <div className={styles.result}>Localtion: {airportName}</div>
               <div className={styles.result}>Time of Publish: {timeOfPublish}</div>
               <div className={styles.result}>{result}</div>
            </div>
        }
        
      </main>
    </div>
  );
}
