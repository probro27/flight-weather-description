import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [weatherCodeInput, setWeatherCodeInput] = useState("");
  const [result, setResult] = useState();

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
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
