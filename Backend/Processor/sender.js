import axios from "axios";

export default async function sendToDatabase(event) {
  try {
    console.log("📦 Sending event:", event);
    // await axios.post("http://localhost:5000/events", event);
  } catch (err) {
    console.log("⚠️ Backend not running (safe during demo)");
  }
}

