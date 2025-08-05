// import { useState } from "react";

// function App() {
//   const [streamId, setStreamId] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleStart = async () => {
//     setLoading(true);
//     try {
//       // Start stream
//       const response = await fetch("http://localhost:8000/start_stream", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ stream_path: "test_files/test.avi" }),
//       });

//       const data = await response.json();
//       setStreamId(data.stream_id);

//       // Optional delay (can use polling instead)
//       await new Promise((res) => setTimeout(res, 1000));

//       // Fetch result
//       const res = await fetch(`http://localhost:8000/get_stream/${data.stream_id}`);
//       const json = await res.json();
//       setResult(json.data); // Extract just the inner data
//     } catch (err) {
//       console.error("Error:", err);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="p-4">
//       <button
//         onClick={handleStart}
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         Start Stream
//       </button>

//       {loading && <p className="mt-4">Processing...</p>}

//       {streamId && (
//         <p className="mt-4 text-green-600 font-semibold">
//           Stream ID: {streamId}
//         </p>
//       )}

//       {result && (
//         <div className="mt-4 border p-4 rounded bg-gray-100">
//           <h2 className="font-bold mb-2">Stream Analysis Result</h2>
//           <p><strong>Low Light:</strong> {String(result.brightness.low_light)}</p>
//           <p><strong>Average Brightness:</strong> {String(result.brightness.average_brightness)}</p>
//           <p><strong>Red Alert:</strong> {String(result.red_alert.red_alert)}</p>
//           <p><strong>Red Pixel Ratio:</strong> {result.red_alert.red_pixel_ratio.toFixed(3)}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
import { Container, CssBaseline } from '@mui/material'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Dashboard />
      </Container>
    </>
  )
}

export default App