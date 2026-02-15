// // // // // import { useState } from 'react'
// // // // // import reactLogo from './assets/react.svg'
// // // // // import viteLogo from '/vite.svg'
// // // // // import './App.css'

// // // // // function App() {
// // // // //   const [count, setCount] = useState(0)

// // // // //   return (
// // // // //     <>
// // // // //       <div>
// // // // //         <a href="https://vite.dev" target="_blank">
// // // // //           <img src={viteLogo} className="logo" alt="Vite logo" />
// // // // //         </a>
// // // // //         <a href="https://react.dev" target="_blank">
// // // // //           <img src={reactLogo} className="logo react" alt="React logo" />
// // // // //         </a>
// // // // //       </div>
// // // // //       <h1>Vite + React</h1>
// // // // //       <div className="card">
// // // // //         <button onClick={() => setCount((count) => count + 1)}>
// // // // //           count is {count}
// // // // //         </button>
// // // // //         <p>
// // // // //           Edit <code>src/App.jsx</code> and save to test HMR
// // // // //         </p>
// // // // //       </div>
// // // // //       <p className="read-the-docs">
// // // // //         Click on the Vite and React logos to learn more
// // // // //       </p>
// // // // //     </>
// // // // //   )
// // // // // }

// // // // // export default App
// // // // import { useState } from "react";
// // // // import axios from "axios";

// // // // export default function App() {
// // // //   const [image, setImage] = useState(null);
// // // //   const [preview, setPreview] = useState(null);
// // // //   const [result, setResult] = useState(null);
// // // //   const [heatmap, setHeatmap] = useState(null);
// // // //   const [loading, setLoading] = useState(false);

// // // //   const API = "http://127.0.0.1:8000";

// // // //   const handleImage = (e) => {
// // // //     const file = e.target.files[0];
// // // //     setImage(file);
// // // //     setPreview(URL.createObjectURL(file));
// // // //     setResult(null);
// // // //     setHeatmap(null);
// // // //   };

// // // //   const predict = async () => {
// // // //     if (!image) return;
// // // //     setLoading(true);

// // // //     const form = new FormData();
// // // //     form.append("file", image);

// // // //     try {
// // // //       const res = await axios.post(`${API}/predict`, form);
// // // //       setResult(res.data);

// // // //       const cam = await axios.post(`${API}/gradcam`, form, {
// // // //         responseType: "blob",
// // // //       });
// // // //       setHeatmap(URL.createObjectURL(cam.data));
// // // //     } catch (err) {
// // // //       alert("Prediction failed");
// // // //     }

// // // //     setLoading(false);
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
// // // //       <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-xl">
// // // //         <h1 className="text-2xl font-bold text-center mb-4">
// // // //           Medical Skin Lesion AI
// // // //         </h1>

// // // //         <p className="text-sm text-gray-600 mb-4 text-center">
// // // //           AI-assisted clinical decision support (research use only)
// // // //         </p>

// // // //         <input
// // // //           type="file"
// // // //           accept="image/*"
// // // //           onChange={handleImage}
// // // //           className="mb-4"
// // // //         />

// // // //         {preview && (
// // // //           <img
// // // //             src={preview}
// // // //             className="w-full h-64 object-contain mb-4 border rounded"
// // // //           />
// // // //         )}

// // // //         <button
// // // //           onClick={predict}
// // // //           disabled={loading}
// // // //           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
// // // //         >
// // // //           {loading ? "Analyzing..." : "Predict"}
// // // //         </button>

// // // //         {result && (
// // // //           <div className="mt-4 text-center">
// // // //             <p className="text-lg font-semibold">
// // // //               Prediction:{" "}
// // // //               <span className="text-blue-600">
// // // //                 {result.prediction}
// // // //               </span>
// // // //             </p>
// // // //             <p className="text-sm text-gray-700">
// // // //               Confidence: {(result.confidence * 100).toFixed(2)}%
// // // //             </p>
// // // //           </div>
// // // //         )}

// // // //         {heatmap && (
// // // //           <div className="mt-4">
// // // //             <p className="text-center font-semibold mb-2">
// // // //               Grad-CAM Explanation
// // // //             </p>
// // // //             <img
// // // //               src={heatmap}
// // // //               className="w-full h-64 object-contain border rounded"
// // // //             />
// // // //           </div>
// // // //         )}

// // // //         <div className="mt-6 text-xs text-gray-500 text-center">
// // // //           ⚠️ This system does NOT replace a dermatologist.
// // // //           Always consult a qualified medical professional.
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // import { useState } from "react";
// // // import axios from "axios";

// // // export default function App() {
// // //   const [image, setImage] = useState(null);
// // //   const [preview, setPreview] = useState(null);
// // //   const [result, setResult] = useState(null);
// // //   const [heatmap, setHeatmap] = useState(null);
// // //   const [loading, setLoading] = useState(false);

// // //   const API = "http://127.0.0.1:8000";

// // //   const handleImage = (e) => {
// // //     const file = e.target.files[0];
// // //     setImage(file);
// // //     setPreview(URL.createObjectURL(file));
// // //     setResult(null);
// // //     setHeatmap(null);
// // //   };

// // //   const predict = async () => {
// // //     if (!image) return;
// // //     setLoading(true);

// // //     const form = new FormData();
// // //     form.append("file", image);

// // //     try {
// // //       const res = await axios.post(`${API}/predict`, form);
// // //       setResult(res.data);

// // //       const cam = await axios.post(`${API}/gradcam`, form, {
// // //         responseType: "blob",
// // //       });
// // //       setHeatmap(URL.createObjectURL(cam.data));
// // //     } catch {
// // //       alert("Prediction failed");
// // //     }

// // //     setLoading(false);
// // //   };

// // //   const riskColor = (conf) => {
// // //     if (conf >= 0.8) return "text-red-600";
// // //     if (conf >= 0.6) return "text-yellow-600";
// // //     return "text-green-600";
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
// // //       <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        
// // //         {/* Header */}
// // //         <h1 className="text-3xl font-bold text-center text-slate-800">
// // //           Medical Skin Lesion AI
// // //         </h1>
// // //         <p className="text-center text-sm text-slate-500 mt-2">
// // //           AI-assisted clinical decision support (research use only)
// // //         </p>

// // //         {/* Upload */}
// // //         <div className="mt-6">
// // //           <input
// // //             type="file"
// // //             accept="image/*"
// // //             onChange={handleImage}
// // //             className="block w-full text-sm file:mr-4 file:py-2 file:px-4
// // //               file:rounded-full file:border-0
// // //               file:text-sm file:font-semibold
// // //               file:bg-blue-50 file:text-blue-700
// // //               hover:file:bg-blue-100"
// // //           />
// // //         </div>

// // //         {/* Image Preview */}
// // //         {preview && (
// // //           <div className="mt-6">
// // //             <img
// // //               src={preview}
// // //               className="w-full h-72 object-contain rounded-lg border"
// // //             />
// // //           </div>
// // //         )}

// // //         {/* Predict Button */}
// // //         <button
// // //           onClick={predict}
// // //           disabled={loading}
// // //           className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold
// // //                      hover:bg-blue-700 transition disabled:opacity-50"
// // //         >
// // //           {loading ? "Analyzing image..." : "Run Prediction"}
// // //         </button>

// // //         {/* Results */}
// // //         {result && (
// // //           <div className="mt-6 text-center">
// // //             <p className="text-lg font-semibold text-slate-700">
// // //               Prediction
// // //             </p>
// // //             <p className={`text-2xl font-bold ${riskColor(result.confidence)}`}>
// // //               {result.prediction}
// // //             </p>

// // //             <div className="mt-3">
// // //               <p className="text-sm text-slate-600 mb-1">
// // //                 Confidence: {(result.confidence * 100).toFixed(2)}%
// // //               </p>
// // //               <div className="w-full bg-slate-200 rounded-full h-3">
// // //                 <div
// // //                   className="h-3 rounded-full bg-blue-600"
// // //                   style={{ width: `${result.confidence * 100}%` }}
// // //                 />
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Grad-CAM */}
// // //         {heatmap && (
// // //           <div className="mt-8">
// // //             <p className="text-center font-semibold text-slate-700 mb-2">
// // //               Model Attention (Grad-CAM)
// // //             </p>
// // //             <img
// // //               src={heatmap}
// // //               className="w-full h-72 object-contain rounded-lg border"
// // //             />
// // //           </div>
// // //         )}

// // //         {/* Disclaimer */}
// // //         <div className="mt-8 text-xs text-slate-500 text-center">
// // //           ⚠️ This system does NOT replace a dermatologist.  
// // //           Always consult a qualified medical professional.
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // import { useState, useEffect } from "react";
// // import axios from "axios";

// // // Icons (Inline SVGs to avoid dependency issues)
// // const UploadIcon = () => (
// //   <svg className="w-8 h-8 mb-2 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
// // );
// // const BrainIcon = () => (
// //   <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
// // );
// // const WarningIcon = () => (
// //   <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
// // );

// // export default function App() {
// //   const [image, setImage] = useState(null);
// //   const [preview, setPreview] = useState(null);
// //   const [result, setResult] = useState(null);
// //   const [heatmap, setHeatmap] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [isHovering, setIsHovering] = useState(false);

// //   const API = "http://127.0.0.1:8000";

// //   const handleImage = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       setImage(file);
// //       setPreview(URL.createObjectURL(file));
// //       setResult(null);
// //       setHeatmap(null);
// //     }
// //   };

// //   const predict = async () => {
// //     if (!image) return;
// //     setLoading(true);

// //     const form = new FormData();
// //     form.append("file", image);

// //     try {
// //       // Simulate slight delay for animation effect if API is too fast
// //       await new Promise(resolve => setTimeout(resolve, 1500)); 
      
// //       const res = await axios.post(`${API}/predict`, form);
// //       setResult(res.data);

// //       const cam = await axios.post(`${API}/gradcam`, form, {
// //         responseType: "blob",
// //       });
// //       setHeatmap(URL.createObjectURL(cam.data));
// //     } catch (err) {
// //       alert("Prediction failed. Ensure backend is running.");
// //     }

// //     setLoading(false);
// //   };

// //   // Dynamic Styles based on risk
// //   const getRiskStyles = (conf) => {
// //     if (conf >= 0.8) return { 
// //         color: "text-red-400", 
// //         bg: "bg-red-500/20", 
// //         border: "border-red-500/50", 
// //         bar: "bg-gradient-to-r from-red-600 to-orange-500" 
// //     };
// //     if (conf >= 0.6) return { 
// //         color: "text-yellow-400", 
// //         bg: "bg-yellow-500/20", 
// //         border: "border-yellow-500/50", 
// //         bar: "bg-gradient-to-r from-yellow-500 to-orange-400" 
// //     };
// //     return { 
// //         color: "text-emerald-400", 
// //         bg: "bg-emerald-500/20", 
// //         border: "border-emerald-500/50", 
// //         bar: "bg-gradient-to-r from-emerald-500 to-cyan-500" 
// //     };
// //   };

// //   return (
// //     <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center p-4 md:p-8 font-sans overflow-hidden relative">
      
// //       {/* Background Ambient Glows */}
// //       <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] animate-pulse"></div>
// //       <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] animate-pulse delay-1000"></div>

// //       {/* Main Glass Card */}
// //       <div className="relative z-10 w-full max-w-5xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-500">
        
// //         {/* LEFT COLUMN: Image Input & Visualization */}
// //         <div className="w-full md:w-1/2 p-8 border-b md:border-b-0 md:border-r border-white/5 relative group">
          
// //           <h2 className="text-xl font-semibold mb-6 flex items-center text-cyan-50">
// //             <span className="w-2 h-6 bg-cyan-500 rounded-full mr-3 shadow-[0_0_15px_rgba(6,182,212,0.5)]"></span>
// //             Scan Input
// //           </h2>

// //           <div 
// //             className={`relative w-full aspect-square bg-slate-800/50 rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden flex flex-col items-center justify-center
// //               ${preview ? 'border-cyan-500/50' : 'border-slate-600 hover:border-cyan-400 hover:bg-slate-800'}
// //             `}
// //             onMouseEnter={() => setIsHovering(true)}
// //             onMouseLeave={() => setIsHovering(false)}
// //           >
// //             {/* Hidden Input */}
// //             <input
// //               type="file"
// //               accept="image/*"
// //               onChange={handleImage}
// //               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
// //             />

// //             {preview ? (
// //               <>
// //                 <img src={preview} className="absolute inset-0 w-full h-full object-cover z-10" />
                
// //                 {/* AI Scanning Animation Overlay */}
// //                 {loading && (
// //                   <div className="absolute inset-0 z-20 bg-cyan-500/10">
// //                     <div className="w-full h-1 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)] absolute top-0 animate-scan"></div>
// //                     <div className="absolute top-2 right-2 text-xs font-mono text-cyan-300 bg-black/50 px-2 py-1 rounded">PROCESSING...</div>
// //                   </div>
// //                 )}
// //               </>
// //             ) : (
// //               <div className="text-center p-6 transition-transform duration-300 group-hover:scale-105">
// //                 <div className="bg-slate-700/50 p-4 rounded-full inline-block mb-3">
// //                     <UploadIcon />
// //                 </div>
// //                 <p className="text-slate-300 font-medium">Drop lesion image here</p>
// //                 <p className="text-slate-500 text-xs mt-1">or click to browse</p>
// //               </div>
// //             )}
// //           </div>

// //           {/* Grad-CAM Mini View */}
// //           {heatmap && (
// //             <div className="mt-6 animate-fade-in-up">
// //               <p className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-wider">AI Attention Map</p>
// //               <div className="relative w-full h-32 bg-black rounded-xl overflow-hidden border border-white/10">
// //                  <img src={heatmap} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* RIGHT COLUMN: Controls & Analytics */}
// //         <div className="w-full md:w-1/2 p-8 flex flex-col justify-between bg-gradient-to-br from-slate-900/50 to-slate-900/80">
// //           <div>
// //             <div className="mb-8">
// //                 <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-2">
// //                 DermaAI<span className="text-xs align-top bg-cyan-900/30 text-cyan-400 px-2 py-0.5 rounded ml-2 border border-cyan-500/20">PRO</span>
// //                 </h1>
// //                 <p className="text-slate-400 text-sm leading-relaxed">
// //                 Advanced neural network analysis for dermatological anomalies. Upload a high-resolution image for real-time inference.
// //                 </p>
// //             </div>

// //             {/* Results Section */}
// //             {result ? (
// //                <div className="space-y-6 animate-fade-in">
// //                   <div className={`p-6 rounded-2xl border ${getRiskStyles(result.confidence).border} ${getRiskStyles(result.confidence).bg} relative overflow-hidden`}>
// //                      {/* Gloss Effect */}
// //                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>

// //                      <div className="relative z-10">
// //                         <p className="text-slate-300 text-sm font-medium uppercase tracking-widest mb-1">Diagnosis</p>
// //                         <h3 className={`text-3xl font-bold capitalize ${getRiskStyles(result.confidence).color}`}>
// //                             {result.prediction}
// //                         </h3>
// //                      </div>
// //                   </div>

// //                   <div className="bg-slate-800/40 rounded-xl p-5 border border-white/5">
// //                     <div className="flex justify-between items-end mb-2">
// //                         <span className="text-slate-400 text-sm">Confidence Score</span>
// //                         <span className="text-2xl font-mono text-white">{(result.confidence * 100).toFixed(1)}%</span>
// //                     </div>
// //                     {/* Progress Bar Container */}
// //                     <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
// //                         {/* Animated Bar */}
// //                         <div 
// //                             className={`h-full rounded-full shadow-[0_0_10px_currentColor] transition-all duration-1000 ease-out ${getRiskStyles(result.confidence).bar}`}
// //                             style={{ width: `${result.confidence * 100}%` }}
// //                         ></div>
// //                     </div>
// //                     <p className="text-xs text-slate-500 mt-3 text-right">Model v2.4 (ResNet50)</p>
// //                   </div>
// //                </div>
// //             ) : (
// //                 <div className="h-48 flex flex-col items-center justify-center text-slate-600 border border-dashed border-slate-800 rounded-xl bg-slate-900/30">
// //                     <p className="text-sm">Ready for analysis...</p>
// //                 </div>
// //             )}
// //           </div>

// //           {/* Footer / Action Area */}
// //           <div className="mt-8">
// //             <button
// //                 onClick={predict}
// //                 disabled={loading || !image}
// //                 className={`
// //                     w-full py-4 rounded-xl font-bold text-lg tracking-wide shadow-lg transition-all duration-300 flex items-center justify-center group relative overflow-hidden
// //                     ${loading || !image 
// //                         ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
// //                         : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-[1.02]'
// //                     }
// //                 `}
// //             >
// //                 {/* Button Shine Effect */}
// //                 {!loading && image && <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine"></div>}
                
// //                 {loading ? (
// //                     <span className="flex items-center animate-pulse">
// //                         Analyzing...
// //                     </span>
// //                 ) : (
// //                     <span className="flex items-center relative z-10">
// //                         <BrainIcon /> Run Analysis
// //                     </span>
// //                 )}
// //             </button>

// //             <div className="mt-4 flex items-center justify-center text-xs text-slate-500 bg-slate-950/50 py-2 rounded-lg border border-white/5">
// //                 <WarningIcon />
// //                 <span>Research purposes only. Consult a dermatologist.</span>
// //             </div>
// //           </div>
// //         </div>

// //       </div>

// //       {/* Global CSS for custom animations not in default Tailwind */}
// //       <style>{`
// //         @keyframes scan {
// //           0% { top: 0%; opacity: 0; }
// //           10% { opacity: 1; }
// //           90% { opacity: 1; }
// //           100% { top: 100%; opacity: 0; }
// //         }
// //         .animate-scan {
// //           animation: scan 2s linear infinite;
// //         }
// //         @keyframes shine {
// //           100% { transform: translateX(100%); }
// //         }
// //         .animate-shine {
// //           animation: shine 1.5s infinite;
// //         }
// //         .animate-fade-in-up {
// //           animation: fadeInUp 0.5s ease-out forwards;
// //         }
// //         @keyframes fadeInUp {
// //             from { opacity: 0; transform: translateY(20px); }
// //             to { opacity: 1; transform: translateY(0); }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }
// import { useState, useEffect } from "react";
// import axios from "axios";

// // Disease Information Database
// const DISEASE_INFO = {
//   AKIEC: {
//     name: "Actinic Keratosis",
//     fullName: "Actinic Keratosis / Bowen's Disease",
//     description: "Pre-cancerous skin lesions caused by long-term sun exposure. These rough, scaly patches can develop into squamous cell carcinoma if left untreated.",
//     symptoms: ["Rough, scaly patches", "Red or brown coloration", "Crusty texture", "Usually on sun-exposed areas"],
//     riskLevel: "moderate",
//     treatment: "Cryotherapy, topical medications, photodynamic therapy",
//     color: "from-amber-500 to-orange-600"
//   },
//   BCC: {
//     name: "Basal Cell Carcinoma",
//     fullName: "Basal Cell Carcinoma",
//     description: "The most common form of skin cancer. While rarely spreading to other parts of the body, it can be locally destructive if not treated.",
//     symptoms: ["Pearly or waxy bump", "Flat, flesh-colored lesion", "Bleeding or oozing sore", "Brown, black or blue lesion"],
//     riskLevel: "high",
//     treatment: "Surgical excision, Mohs surgery, radiation therapy",
//     color: "from-red-500 to-rose-600"
//   },
//   BEN_OTH: {
//     name: "Benign Lesion",
//     fullName: "Benign Other Lesions",
//     description: "Non-cancerous skin growths that pose no health risk. These can include various benign skin conditions.",
//     symptoms: ["Varied appearance", "Stable over time", "No rapid changes", "Painless"],
//     riskLevel: "low",
//     treatment: "Usually no treatment needed, monitoring recommended",
//     color: "from-emerald-500 to-teal-600"
//   },
//   BKL: {
//     name: "Seborrheic Keratosis",
//     fullName: "Benign Keratosis-like Lesions",
//     description: "Common benign skin growths that appear with age. They have a waxy, stuck-on appearance and are completely harmless.",
//     symptoms: ["Waxy, stuck-on appearance", "Brown, black or tan", "Round or oval shape", "Slightly raised"],
//     riskLevel: "low",
//     treatment: "No treatment needed unless cosmetically bothersome",
//     color: "from-emerald-500 to-green-600"
//   },
//   DF: {
//     name: "Dermatofibroma",
//     fullName: "Dermatofibroma",
//     description: "Benign fibrous nodules commonly found on the legs. These firm bumps are harmless but may be tender to touch.",
//     symptoms: ["Firm, raised bump", "Brown or red coloration", "Dimples when pinched", "Usually on legs"],
//     riskLevel: "low",
//     treatment: "Observation, surgical removal if symptomatic",
//     color: "from-cyan-500 to-blue-600"
//   },
//   INF: {
//     name: "Infection",
//     fullName: "Infectious Dermatitis",
//     description: "Skin infections caused by bacteria, viruses, or fungi requiring medical attention and appropriate treatment.",
//     symptoms: ["Redness and warmth", "Swelling", "Pain or tenderness", "Possible pus or discharge"],
//     riskLevel: "moderate",
//     treatment: "Antibiotics, antifungals, or antivirals as appropriate",
//     color: "from-orange-500 to-amber-600"
//   },
//   MAL_OTH: {
//     name: "Malignant Other",
//     fullName: "Other Malignant Lesions",
//     description: "Various types of malignant skin conditions that require immediate medical evaluation and treatment.",
//     symptoms: ["Rapid changes", "Irregular borders", "Varied coloration", "Increasing size"],
//     riskLevel: "high",
//     treatment: "Surgical excision, radiation, chemotherapy as needed",
//     color: "from-red-600 to-pink-600"
//   },
//   MEL: {
//     name: "Melanoma",
//     fullName: "Melanoma",
//     description: "The most serious type of skin cancer. Early detection and treatment are crucial for the best outcomes.",
//     symptoms: ["Asymmetric shape", "Irregular borders", "Multiple colors", "Diameter > 6mm", "Evolution/changes"],
//     riskLevel: "critical",
//     treatment: "Surgical excision, immunotherapy, targeted therapy",
//     color: "from-purple-600 to-fuchsia-600"
//   },
//   NV: {
//     name: "Melanocytic Nevus",
//     fullName: "Melanocytic Nevus (Mole)",
//     description: "Common benign moles composed of melanocytes. Most are harmless but should be monitored for changes.",
//     symptoms: ["Uniform color", "Round or oval", "Well-defined borders", "Stable over time"],
//     riskLevel: "low",
//     treatment: "Monitoring, removal if suspicious changes occur",
//     color: "from-sky-500 to-cyan-600"
//   },
//   SCCKA: {
//     name: "Squamous Cell Carcinoma",
//     fullName: "Squamous Cell Carcinoma / Keratoacanthoma",
//     description: "The second most common skin cancer. Can spread if untreated, requiring prompt medical attention.",
//     symptoms: ["Firm, red nodule", "Scaly, crusted surface", "Ulceration", "Rapid growth"],
//     riskLevel: "high",
//     treatment: "Surgical excision, Mohs surgery, radiation",
//     color: "from-rose-500 to-red-600"
//   },
//   VASC: {
//     name: "Vascular Lesion",
//     fullName: "Vascular Lesions",
//     description: "Benign growths involving blood vessels. Includes hemangiomas, angiomas, and other vascular abnormalities.",
//     symptoms: ["Red or purple coloration", "Raised or flat", "May blanch with pressure", "Various sizes"],
//     riskLevel: "low",
//     treatment: "Observation, laser therapy for cosmetic concerns",
//     color: "from-pink-500 to-rose-600"
//   }
// };

// // Icons
// const UploadIcon = () => (
//   <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
//   </svg>
// );

// const ScanIcon = () => (
//   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
//   </svg>
// );

// const AlertIcon = () => (
//   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
//   </svg>
// );

// const InfoIcon = () => (
//   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//   </svg>
// );

// const DNAIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
//   </svg>
// );

// export default function App() {
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [result, setResult] = useState(null);
//   const [heatmap, setHeatmap] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showInfo, setShowInfo] = useState(false);

//   const API = "http://127.0.0.1:8000";

//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//       setResult(null);
//       setHeatmap(null);
//       setShowInfo(false);
//     }
//   };

//   const predict = async () => {
//     if (!image) return;
//     setLoading(true);
//     setShowInfo(false);

//     const form = new FormData();
//     form.append("file", image);

//     try {
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       const res = await axios.post(`${API}/predict`, form);
//       setResult(res.data);
//       setShowInfo(true);

//       const cam = await axios.post(`${API}/gradcam`, form, {
//         responseType: "blob",
//       });
//       setHeatmap(URL.createObjectURL(cam.data));
//     } catch (err) {
//       alert("Prediction failed. Ensure backend is running on port 8000.");
//     }

//     setLoading(false);
//   };

//   const getRiskBadge = (level) => {
//     const badges = {
//       low: { text: "Low Risk", color: "from-emerald-500 to-teal-500", glow: "shadow-emerald-500/50" },
//       moderate: { text: "Moderate Risk", color: "from-amber-500 to-orange-500", glow: "shadow-amber-500/50" },
//       high: { text: "High Risk", color: "from-rose-500 to-red-500", glow: "shadow-rose-500/50" },
//       critical: { text: "Critical Risk", color: "from-purple-600 to-fuchsia-600", glow: "shadow-purple-500/50" }
//     };
//     return badges[level] || badges.low;
//   };

//   const diseaseData = result ? DISEASE_INFO[result.prediction] : null;
//   const riskBadge = diseaseData ? getRiskBadge(diseaseData.riskLevel) : null;

//   return (
//     <div className="min-h-screen bg-[#0a0118] text-white relative overflow-hidden font-sans">
      
//       {/* Animated Background */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] animate-pulse-slow"></div>
//         <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[150px] animate-pulse-slow delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-fuchsia-500/10 rounded-full blur-[120px] animate-pulse-slow delay-2000"></div>
        
//         {/* Grid Pattern */}
//         <div className="absolute inset-0 opacity-[0.03]" style={{
//           backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
//                            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
//           backgroundSize: '50px 50px'
//         }}></div>
//       </div>

//       {/* Header */}
//       <header className="relative z-10 px-6 py-6 border-b border-white/5 backdrop-blur-xl">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
//               <DNAIcon />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 text-transparent bg-clip-text">
//                 DermaAI Neural
//               </h1>
//               <p className="text-xs text-purple-300/60 tracking-wider">MEDICAL IMAGING ANALYSIS</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 text-xs">
//             <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
//               <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
//               System Online
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        
//         <div className="grid lg:grid-cols-2 gap-8 mb-8">
          
//           {/* Upload Card */}
//           <div className="group">
//             <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden hover:border-purple-500/30 transition-all duration-500 shadow-2xl hover:shadow-purple-500/10">
//               <div className="p-8">
//                 <div className="flex items-center gap-2 mb-6">
//                   <div className="w-1 h-6 rounded-full bg-gradient-to-b from-purple-500 to-cyan-500"></div>
//                   <h2 className="text-lg font-semibold text-purple-200">Image Upload</h2>
//                 </div>

//                 <div className="relative">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImage}
//                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
//                   />
                  
//                   <div className={`relative aspect-square rounded-2xl border-2 border-dashed overflow-hidden transition-all duration-300
//                     ${preview ? 'border-purple-500/50 bg-black/30' : 'border-purple-500/20 bg-purple-950/20 hover:border-purple-500/40 hover:bg-purple-950/30'}`}>
                    
//                     {preview ? (
//                       <>
//                         <img src={preview} className="w-full h-full object-cover" alt="Preview" />
//                         {loading && (
//                           <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent flex items-center justify-center">
//                             <div className="text-center">
//                               <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-4 mx-auto"></div>
//                               <p className="text-sm font-medium text-purple-200">Neural Analysis in Progress...</p>
//                               <div className="mt-4 h-1 w-48 bg-purple-950/50 rounded-full overflow-hidden mx-auto">
//                                 <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-progress"></div>
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
//                         <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600/20 to-cyan-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
//                           <UploadIcon />
//                         </div>
//                         <p className="text-purple-100 font-medium mb-1">Drop your image here</p>
//                         <p className="text-purple-300/50 text-sm">or click to browse files</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <button
//                   onClick={predict}
//                   disabled={!image || loading}
//                   className={`w-full mt-6 py-4 rounded-xl font-semibold text-base tracking-wide transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group/btn
//                     ${!image || loading 
//                       ? 'bg-white/5 text-white/30 cursor-not-allowed border border-white/10' 
//                       : 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg hover:shadow-purple-500/50'
//                     }`}
//                 >
//                   {!image || loading ? null : (
//                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
//                   )}
//                   <ScanIcon />
//                   <span className="relative z-10">{loading ? 'Analyzing...' : 'Run Neural Analysis'}</span>
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Grad-CAM Visualization */}
//           <div>
//             <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl h-full">
//               <div className="p-8 h-full flex flex-col">
//                 <div className="flex items-center gap-2 mb-6">
//                   <div className="w-1 h-6 rounded-full bg-gradient-to-b from-cyan-500 to-blue-500"></div>
//                   <h2 className="text-lg font-semibold text-cyan-200">AI Attention Heatmap</h2>
//                 </div>

//                 <div className="flex-1 relative rounded-2xl border border-white/10 bg-black/30 overflow-hidden">
//                   {heatmap ? (
//                     <div className="relative w-full h-full">
//                       <img src={heatmap} className="w-full h-full object-contain" alt="Grad-CAM" />
//                       <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
//                         GRAD-CAM ACTIVE
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="absolute inset-0 flex items-center justify-center text-center p-8">
//                       <div>
//                         <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-600/20 to-blue-600/20 flex items-center justify-center mx-auto mb-4">
//                           <svg className="w-8 h-8 text-cyan-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
//                           </svg>
//                         </div>
//                         <p className="text-cyan-300/50 text-sm">Attention map will appear after analysis</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Results Section */}
//         {result && diseaseData && showInfo && (
//           <div className="animate-slide-up">
            
//             {/* Diagnosis Header Card */}
//             <div className="mb-6 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
//               <div className="p-8">
//                 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
//                   <div className="flex-1">
//                     <p className="text-sm text-purple-300/60 uppercase tracking-wider mb-2 font-medium">Diagnosis Result</p>
//                     <h3 className={`text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r ${diseaseData.color} text-transparent bg-clip-text`}>
//                       {diseaseData.name}
//                     </h3>
//                     <p className="text-purple-200/80 text-sm">{diseaseData.fullName}</p>
//                   </div>
                  
//                   <div className="flex flex-col gap-4">
//                     <div className={`px-6 py-3 rounded-2xl bg-gradient-to-r ${riskBadge.color} text-white font-bold shadow-lg ${riskBadge.glow} flex items-center gap-2`}>
//                       <AlertIcon />
//                       {riskBadge.text}
//                     </div>
//                     <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
//                       <p className="text-xs text-purple-300/60 uppercase tracking-wider mb-1">Confidence</p>
//                       <div className="flex items-baseline gap-2">
//                         <span className="text-3xl font-bold text-white">{(result.confidence * 100).toFixed(1)}</span>
//                         <span className="text-lg text-purple-300">%</span>
//                       </div>
//                       <div className="mt-2 h-2 bg-black/30 rounded-full overflow-hidden">
//                         <div 
//                           className={`h-full bg-gradient-to-r ${diseaseData.color} transition-all duration-1000 rounded-full shadow-lg`}
//                           style={{ width: `${result.confidence * 100}%` }}
//                         ></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Information Grid */}
//             <div className="grid md:grid-cols-2 gap-6">
              
//               {/* Description Card */}
//               <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl hover:border-purple-500/30 transition-all">
//                 <div className="p-8">
//                   <div className="flex items-center gap-2 mb-4">
//                     <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600/20 to-purple-600/10 flex items-center justify-center">
//                       <InfoIcon />
//                     </div>
//                     <h4 className="text-lg font-semibold text-purple-200">About This Condition</h4>
//                   </div>
//                   <p className="text-purple-100/80 leading-relaxed">{diseaseData.description}</p>
//                 </div>
//               </div>

//               {/* Symptoms Card */}
//               <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl hover:border-cyan-500/30 transition-all">
//                 <div className="p-8">
//                   <div className="flex items-center gap-2 mb-4">
//                     <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600/20 to-cyan-600/10 flex items-center justify-center">
//                       <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
//                       </svg>
//                     </div>
//                     <h4 className="text-lg font-semibold text-cyan-200">Common Symptoms</h4>
//                   </div>
//                   <ul className="space-y-2">
//                     {diseaseData.symptoms.map((symptom, idx) => (
//                       <li key={idx} className="flex items-start gap-3 text-cyan-100/80">
//                         <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
//                         <span>{symptom}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//               {/* Treatment Card */}
//               <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl hover:border-fuchsia-500/30 transition-all md:col-span-2">
//                 <div className="p-8">
//                   <div className="flex items-center gap-2 mb-4">
//                     <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-600/20 to-fuchsia-600/10 flex items-center justify-center">
//                       <svg className="w-5 h-5 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
//                       </svg>
//                     </div>
//                     <h4 className="text-lg font-semibold text-fuchsia-200">Treatment Options</h4>
//                   </div>
//                   <p className="text-fuchsia-100/80 leading-relaxed">{diseaseData.treatment}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Disclaimer */}
//             <div className="mt-6 bg-amber-500/10 backdrop-blur-xl rounded-2xl border border-amber-500/30 p-6">
//               <div className="flex gap-4">
//                 <div className="flex-shrink-0">
//                   <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
//                     <AlertIcon />
//                   </div>
//                 </div>
//                 <div>
//                   <h5 className="text-amber-200 font-semibold mb-1">Medical Disclaimer</h5>
//                   <p className="text-amber-100/80 text-sm leading-relaxed">
//                     This AI analysis is for research and educational purposes only. It should not replace professional medical advice, diagnosis, or treatment. 
//                     Always consult with a qualified dermatologist or healthcare provider for proper evaluation and treatment recommendations.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* No Results State */}
//         {!result && !loading && (
//           <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-12 text-center">
//             <div className="max-w-md mx-auto">
//               <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600/20 to-cyan-600/20 flex items-center justify-center mx-auto mb-6">
//                 <DNAIcon />
//               </div>
//               <h3 className="text-2xl font-bold text-purple-200 mb-3">Ready for Analysis</h3>
//               <p className="text-purple-300/60 leading-relaxed">
//                 Upload a high-quality dermatological image to begin neural network analysis. 
//                 Our AI will process the image and provide detailed diagnostic insights.
//               </p>
//             </div>
//           </div>
//         )}
//       </main>

//       {/* CSS Animations */}
//       <style>{`
//         @keyframes pulse-slow {
//           0%, 100% { opacity: 0.15; transform: scale(1); }
//           50% { opacity: 0.25; transform: scale(1.05); }
//         }
//         .animate-pulse-slow {
//           animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//         }
//         .delay-1000 {
//           animation-delay: 2s;
//         }
//         .delay-2000 {
//           animation-delay: 4s;
//         }
//         @keyframes slide-up {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-slide-up {
//           animation: slide-up 0.6s ease-out forwards;
//         }
//         @keyframes progress {
//           0% { width: 0%; }
//           100% { width: 100%; }
//         }
//         .animate-progress {
//           animation: progress 1.5s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }
import { useState } from "react";
import axios from "axios";

// Disease Information Database
const DISEASE_INFO = {
  AKIEC: {
    name: "Actinic Keratosis",
    fullName: "Actinic Keratosis / Bowen's Disease",
    description: "Pre-cancerous skin lesions caused by long-term sun exposure. These rough, scaly patches can develop into squamous cell carcinoma if left untreated.",
    symptoms: ["Rough, scaly patches", "Red or brown coloration", "Crusty texture", "Usually on sun-exposed areas"],
    riskLevel: "moderate",
    treatment: "Cryotherapy, topical medications, photodynamic therapy",
    color: "from-amber-500 to-orange-600"
  },
  BCC: {
    name: "Basal Cell Carcinoma",
    fullName: "Basal Cell Carcinoma",
    description: "The most common form of skin cancer. While rarely spreading to other parts of the body, it can be locally destructive if not treated.",
    symptoms: ["Pearly or waxy bump", "Flat, flesh-colored lesion", "Bleeding or oozing sore", "Brown, black or blue lesion"],
    riskLevel: "high",
    treatment: "Surgical excision, Mohs surgery, radiation therapy",
    color: "from-red-500 to-rose-600"
  },
  BEN_OTH: {
    name: "Benign Lesion",
    fullName: "Benign Other Lesions",
    description: "Non-cancerous skin growths that pose no health risk. These can include various benign skin conditions.",
    symptoms: ["Varied appearance", "Stable over time", "No rapid changes", "Painless"],
    riskLevel: "low",
    treatment: "Usually no treatment needed, monitoring recommended",
    color: "from-emerald-500 to-teal-600"
  },
  BKL: {
    name: "Seborrheic Keratosis",
    fullName: "Benign Keratosis-like Lesions",
    description: "Common benign skin growths that appear with age. They have a waxy, stuck-on appearance and are completely harmless.",
    symptoms: ["Waxy, stuck-on appearance", "Brown, black or tan", "Round or oval shape", "Slightly raised"],
    riskLevel: "low",
    treatment: "No treatment needed unless cosmetically bothersome",
    color: "from-emerald-500 to-green-600"
  },
  DF: {
    name: "Dermatofibroma",
    fullName: "Dermatofibroma",
    description: "Benign fibrous nodules commonly found on the legs. These firm bumps are harmless but may be tender to touch.",
    symptoms: ["Firm, raised bump", "Brown or red coloration", "Dimples when pinched", "Usually on legs"],
    riskLevel: "low",
    treatment: "Observation, surgical removal if symptomatic",
    color: "from-cyan-500 to-blue-600"
  },
  INF: {
    name: "Infection",
    fullName: "Infectious Dermatitis",
    description: "Skin infections caused by bacteria, viruses, or fungi requiring medical attention and appropriate treatment.",
    symptoms: ["Redness and warmth", "Swelling", "Pain or tenderness", "Possible pus or discharge"],
    riskLevel: "moderate",
    treatment: "Antibiotics, antifungals, or antivirals as appropriate",
    color: "from-orange-500 to-amber-600"
  },
  MAL_OTH: {
    name: "Malignant Other",
    fullName: "Other Malignant Lesions",
    description: "Various types of malignant skin conditions that require immediate medical evaluation and treatment.",
    symptoms: ["Rapid changes", "Irregular borders", "Varied coloration", "Increasing size"],
    riskLevel: "high",
    treatment: "Surgical excision, radiation, chemotherapy as needed",
    color: "from-red-600 to-pink-600"
  },
  MEL: {
    name: "Melanoma",
    fullName: "Melanoma",
    description: "The most serious type of skin cancer. Early detection and treatment are crucial for the best outcomes.",
    symptoms: ["Asymmetric shape", "Irregular borders", "Multiple colors", "Diameter > 6mm", "Evolution/changes"],
    riskLevel: "critical",
    treatment: "Surgical excision, immunotherapy, targeted therapy",
    color: "from-purple-600 to-fuchsia-600"
  },
  NV: {
    name: "Melanocytic Nevus",
    fullName: "Melanocytic Nevus (Mole)",
    description: "Common benign moles composed of melanocytes. Most are harmless but should be monitored for changes.",
    symptoms: ["Uniform color", "Round or oval", "Well-defined borders", "Stable over time"],
    riskLevel: "low",
    treatment: "Monitoring, removal if suspicious changes occur",
    color: "from-sky-500 to-cyan-600"
  },
  SCCKA: {
    name: "Squamous Cell Carcinoma",
    fullName: "Squamous Cell Carcinoma / Keratoacanthoma",
    description: "The second most common skin cancer. Can spread if untreated, requiring prompt medical attention.",
    symptoms: ["Firm, red nodule", "Scaly, crusted surface", "Ulceration", "Rapid growth"],
    riskLevel: "high",
    treatment: "Surgical excision, Mohs surgery, radiation",
    color: "from-rose-500 to-red-600"
  },
  VASC: {
    name: "Vascular Lesion",
    fullName: "Vascular Lesions",
    description: "Benign growths involving blood vessels. Includes hemangiomas, angiomas, and other vascular abnormalities.",
    symptoms: ["Red or purple coloration", "Raised or flat", "May blanch with pressure", "Various sizes"],
    riskLevel: "low",
    treatment: "Observation, laser therapy for cosmetic concerns",
    color: "from-pink-500 to-rose-600"
  }
};

// Icons
const UploadIcon = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
  </svg>
);

const ScanIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
  </svg>
);

const AlertIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
  </svg>
);

const InfoIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

const DNAIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
  </svg>
);

export default function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [heatmap, setHeatmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const API = "http://127.0.0.1:8000";

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setHeatmap(null);
      setShowInfo(false);
    }
  };

  const predict = async () => {
    if (!image) return;
    setLoading(true);
    setShowInfo(false);

    const form = new FormData();
    form.append("file", image);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const res = await axios.post(`${API}/predict`, form);
      setResult(res.data);
      setShowInfo(true);

      const cam = await axios.post(`${API}/gradcam`, form, {
        responseType: "blob",
      });
      setHeatmap(URL.createObjectURL(cam.data));
    } catch (err) {
      alert("Prediction failed. Ensure backend is running on port 8000.");
    }

    setLoading(false);
  };

  const getRiskBadge = (level) => {
    const badges = {
      low: { text: "Low Risk", color: "from-emerald-500 to-teal-500", glow: "shadow-emerald-500/50" },
      moderate: { text: "Moderate Risk", color: "from-amber-500 to-orange-500", glow: "shadow-amber-500/50" },
      high: { text: "High Risk", color: "from-rose-500 to-red-500", glow: "shadow-rose-500/50" },
      critical: { text: "Critical Risk", color: "from-purple-600 to-fuchsia-600", glow: "shadow-purple-500/50" }
    };
    return badges[level] || badges.low;
  };

  const diseaseData = result ? DISEASE_INFO[result.prediction] : null;
  const riskBadge = diseaseData ? getRiskBadge(diseaseData.riskLevel) : null;

  return (
    <div className="min-h-screen bg-[#0a0118] text-white relative overflow-hidden">
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-[100px] animate-pulse-slow" style={{animationDelay: '4s'}}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 sm:px-6 py-4 border-b border-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <DNAIcon />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 text-transparent bg-clip-text">
                DermaAI Neural
              </h1>
              <p className="text-[10px] sm:text-xs text-purple-300/60 tracking-wider">MEDICAL IMAGING ANALYSIS</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1 sm:gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="hidden sm:inline">System Online</span>
              <span className="sm:hidden">Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          
          {/* Upload Card */}
          <div className="group">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden hover:border-purple-500/30 transition-all duration-500 shadow-2xl hover:shadow-purple-500/10">
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 rounded-full bg-gradient-to-b from-purple-500 to-cyan-500"></div>
                  <h2 className="text-base sm:text-lg font-semibold text-purple-200">Image Upload</h2>
                </div>

                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  
                  <div className={`relative aspect-square rounded-xl sm:rounded-2xl border-2 border-dashed overflow-hidden transition-all duration-300
                    ${preview ? 'border-purple-500/50 bg-black/30' : 'border-purple-500/20 bg-purple-950/20 hover:border-purple-500/40 hover:bg-purple-950/30'}`}>
                    
                    {preview ? (
                      <>
                        <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                        {loading && (
                          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-3 mx-auto"></div>
                              <p className="text-xs sm:text-sm font-medium text-purple-200">Analyzing...</p>
                              <div className="mt-3 h-1 w-32 sm:w-48 bg-purple-950/50 rounded-full overflow-hidden mx-auto">
                                <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-progress"></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-purple-600/20 to-cyan-600/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <UploadIcon />
                        </div>
                        <p className="text-sm sm:text-base text-purple-100 font-medium mb-1">Drop image here</p>
                        <p className="text-xs text-purple-300/50">or click to browse</p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={predict}
                  disabled={!image || loading}
                  className={`w-full mt-4 sm:mt-6 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base tracking-wide transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group/btn
                    ${!image || loading 
                      ? 'bg-white/5 text-white/30 cursor-not-allowed border border-white/10' 
                      : 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg hover:shadow-purple-500/50'
                    }`}
                >
                  {!image || loading ? null : (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                  )}
                  <ScanIcon />
                  <span className="relative z-10">{loading ? 'Analyzing...' : 'Run Neural Analysis'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Grad-CAM Visualization */}
          <div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden shadow-2xl h-full">
              <div className="p-4 sm:p-6 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 rounded-full bg-gradient-to-b from-cyan-500 to-blue-500"></div>
                  <h2 className="text-base sm:text-lg font-semibold text-cyan-200">AI Attention Heatmap</h2>
                </div>

                <div className="flex-1 relative rounded-xl sm:rounded-2xl border border-white/10 bg-black/30 overflow-hidden min-h-[200px]">
                  {heatmap ? (
                    <div className="relative w-full h-full">
                      <img src={heatmap} className="w-full h-full object-contain" alt="Grad-CAM" />
                      <div className="absolute top-3 right-3 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-[10px] sm:text-xs font-mono">
                        GRAD-CAM
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-center p-6">
                      <div>
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-cyan-600/20 to-blue-600/20 flex items-center justify-center mx-auto mb-3">
                          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                        </div>
                        <p className="text-xs sm:text-sm text-cyan-300/50">Heatmap appears after analysis</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && diseaseData && showInfo && (
          <div className="animate-slide-up space-y-4 sm:space-y-6">
            
            {/* Diagnosis Header Card */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm text-purple-300/60 uppercase tracking-wider mb-2 font-medium">Diagnosis Result</p>
                    <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r ${diseaseData.color} text-transparent bg-clip-text`}>
                      {diseaseData.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-purple-200/80">{diseaseData.fullName}</p>
                  </div>
                  
                  <div className="flex flex-row lg:flex-col gap-3 sm:gap-4">
                    <div className={`flex-1 lg:flex-none px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r ${riskBadge.color} text-white font-bold shadow-lg ${riskBadge.glow} flex items-center justify-center gap-2 text-sm sm:text-base`}>
                      <AlertIcon />
                      <span className="hidden sm:inline">{riskBadge.text}</span>
                      <span className="sm:hidden">{riskBadge.text.split(' ')[0]}</span>
                    </div>
                    <div className="flex-1 lg:flex-none bg-white/10 backdrop-blur rounded-xl p-3 sm:p-4 border border-white/20">
                      <p className="text-[10px] sm:text-xs text-purple-300/60 uppercase tracking-wider mb-1">Confidence</p>
                      <div className="flex items-baseline gap-1 sm:gap-2">
                        <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{(result.confidence * 100).toFixed(1)}</span>
                        <span className="text-sm sm:text-base lg:text-lg text-purple-300">%</span>
                      </div>
                      <div className="mt-2 h-1.5 sm:h-2 bg-black/30 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${diseaseData.color} transition-all duration-1000 rounded-full shadow-lg`}
                          style={{ width: `${result.confidence * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              
              {/* Description Card */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden shadow-2xl hover:border-purple-500/30 transition-all">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-purple-600/20 to-purple-600/10 flex items-center justify-center">
                      <InfoIcon />
                    </div>
                    <h4 className="text-base sm:text-lg font-semibold text-purple-200">About This Condition</h4>
                  </div>
                  <p className="text-sm sm:text-base text-purple-100/80 leading-relaxed">{diseaseData.description}</p>
                </div>
              </div>

              {/* Symptoms Card */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden shadow-2xl hover:border-cyan-500/30 transition-all">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-600/20 to-cyan-600/10 flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                      </svg>
                    </div>
                    <h4 className="text-base sm:text-lg font-semibold text-cyan-200">Common Symptoms</h4>
                  </div>
                  <ul className="space-y-2">
                    {diseaseData.symptoms.map((symptom, idx) => (
                      <li key={idx} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-cyan-100/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 sm:mt-2 flex-shrink-0"></div>
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Treatment Card */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden shadow-2xl hover:border-fuchsia-500/30 transition-all md:col-span-2">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-fuchsia-600/20 to-fuchsia-600/10 flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                      </svg>
                    </div>
                    <h4 className="text-base sm:text-lg font-semibold text-fuchsia-200">Treatment Options</h4>
                  </div>
                  <p className="text-sm sm:text-base text-fuchsia-100/80 leading-relaxed">{diseaseData.treatment}</p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-500/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-amber-500/30 p-4 sm:p-6">
              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <AlertIcon />
                  </div>
                </div>
                <div>
                  <h5 className="text-sm sm:text-base text-amber-200 font-semibold mb-1">Medical Disclaimer</h5>
                  <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed">
                    This AI analysis is for research and educational purposes only. Always consult with a qualified dermatologist or healthcare provider for proper evaluation and treatment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Results State */}
        {!result && !loading && (
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 p-8 sm:p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-purple-600/20 to-cyan-600/20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <DNAIcon />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-purple-200 mb-2 sm:mb-3">Ready for Analysis</h3>
              <p className="text-sm sm:text-base text-purple-300/60 leading-relaxed">
                Upload a dermatological image to begin AI analysis and receive detailed diagnostic insights.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}