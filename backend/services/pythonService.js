// // // // // // const { spawn } = require("child_process");

// // // // // // module.exports = (filePath) => {
// // // // // //   return new Promise((resolve, reject) => {
// // // // // //     const py = spawn("python", ["ai_service/pdf_summarizer.py"]);

// // // // // //     py.stdin.write(JSON.stringify({ file_path: filePath }));
// // // // // //     py.stdin.end();

// // // // // //     let output = "";

// // // // // //     py.stdout.on("data", data => output += data.toString());
// // // // // //     py.stderr.on("data", err => reject(err.toString()));

// // // // // //     py.on("close", () => resolve(JSON.parse(output)));
// // // // // //   });
// // // // // // };


// // // // // const { spawn } = require("child_process");

// // // // // const runSummarizer = (filePath, mode = "text") => {
// // // // //   return new Promise((resolve, reject) => {
// // // // //     const py = spawn("python", ["ai_service/pdf_summarizer.py"]);

// // // // //     const payload = {
// // // // //       file_path: filePath,
// // // // //       mode: mode
// // // // //     };

// // // // //     py.stdin.write(JSON.stringify(payload));
// // // // //     py.stdin.end();

// // // // //     let output = "";

// // // // //     py.stdout.on("data", data => {
// // // // //       output += data.toString();
// // // // //     });

// // // // //     py.stderr.on("data", err => {
// // // // //       reject(err.toString());
// // // // //     });

// // // // //     py.on("close", () => {
// // // // //       resolve(JSON.parse(output));
// // // // //     });
// // // // //   });
// // // // // };

// // // // // module.exports = runSummarizer;


// // // // const path = require("path");
// // // // const { spawn } = require("child_process");

// // // // const runSummarizer = (filePath, mode = "text") => {
// // // //   return new Promise((resolve, reject) => {
// // // //     const scriptPath = path.join(
// // // //       __dirname,
// // // //       "../../ai_service/pdf_summarizer.py"
// // // //     );

// // // //     const py = spawn("python", [scriptPath]);

// // // //     const payload = {
// // // //       file_path: filePath,
// // // //       mode
// // // //     };

// // // //     py.stdin.write(JSON.stringify(payload));
// // // //     py.stdin.end();

// // // //     let output = "";

// // // //     py.stdout.on("data", (data) => {
// // // //       output += data.toString();
// // // //     });

// // // //     py.stderr.on("data", (err) => {
// // // //       reject(err.toString());
// // // //     });

// // // //     // py.on("close", () => {
// // // //     //   resolve(JSON.parse(output));
// // // //     // });
// // // //     py.on("close", () => {
// // // //   try {
// // // //     if (!output || !output.trim()) {
// // // //       return reject("Python returned empty output");
// // // //     }

// // // //     const parsed = JSON.parse(output);
// // // //     resolve(parsed);
// // // //   } catch (err) {
// // // //     reject("Invalid JSON from Python: " + output);
// // // //   }
// // // // });

// // // //   });
// // // // };

// // // // module.exports = runSummarizer;

// // // // const { spawn } = require("child_process");
// // // // const path = require("path");

// // // // const runSummarizer = (filePath, mode = "text") => {
// // // //   return new Promise((resolve, reject) => {
// // // //     const scriptPath = path.join(
// // // //       __dirname,
// // // //       "../../ai_service/pdf_summarizer.py"
// // // //     );

// // // //     const py = spawn("python", [scriptPath], {
// // // //       env: process.env
// // // //     });

// // // //     const payload = {
// // // //       file_path: filePath,
// // // //       mode
// // // //     };

// // // //     let stdout = "";
// // // //     let stderr = "";

// // // //     py.stdin.write(JSON.stringify(payload));
// // // //     py.stdin.end();

// // // //     py.stdout.on("data", (data) => {
// // // //       stdout += data.toString();
// // // //     });

// // // //     py.stderr.on("data", (data) => {
// // // //       stderr += data.toString();
// // // //     });

// // // //     py.on("close", (code) => {
// // // //       if (stderr) {
// // // //         console.error("========== PYTHON STDERR ==========");
// // // //         console.error(stderr);
// // // //         console.error("=================================");
// // // //         return reject(stderr);
// // // //       }

// // // //       if (!stdout || !stdout.trim()) {
// // // //         return reject("Python returned empty output");
// // // //       }

// // // //       try {
// // // //         resolve(JSON.parse(stdout));
// // // //       } catch (err) {
// // // //         reject("Invalid JSON from Python:\n" + stdout);
// // // //       }
// // // //     });
// // // //   });
// // // // };

// // // // module.exports = runSummarizer;


// // // const { spawn } = require("child_process");
// // // const path = require("path");

// // // const PYTHON_PATH = process.env.PYTHON_PATH || "python";

// // // const runSummarizer = (filePath, mode = "text") => {
// // //   return new Promise((resolve, reject) => {
// // //     const scriptPath = path.join(
// // //       __dirname,
// // //       "../../ai_service/pdf_summarizer.py"
// // //     );

// // //     const py = spawn(PYTHON_PATH, [scriptPath], {
// // //       stdio: ["pipe", "pipe", "pipe"],
// // //       env: process.env
// // //     });

// // //     const payload = { file_path: filePath, mode };

// // //     let stdout = "";
// // //     let stderr = "";

// // //     py.stdin.write(JSON.stringify(payload));
// // //     py.stdin.end();

// // //     py.stdout.on("data", (data) => {
// // //       stdout += data.toString();
// // //     });

// // //     py.stderr.on("data", (data) => {
// // //       stderr += data.toString();
// // //     });

// // //     py.on("close", () => {
// // //       if (stderr) return reject(stderr);
// // //       if (!stdout.trim()) return reject("Python returned empty output");

// // //       try {
// // //         resolve(JSON.parse(stdout));
// // //       } catch {
// // //         reject("Invalid JSON from Python");
// // //       }
// // //     });
// // //   });
// // // };

// // // module.exports = runSummarizer;


// // const { spawn } = require("child_process");
// // const path = require("path");

// // const PYTHON_PATH = process.env.PYTHON_PATH; // must be set
// // if (!PYTHON_PATH) {
// //   throw new Error("PYTHON_PATH is not defined in .env");
// // }

// // // 🔴 ABSOLUTE path to python script
// // const SCRIPT_PATH = path.resolve(
// //   __dirname,
// //   "../../ai_service/pdf_summarizer.py"
// // );

// // const runSummarizer = (filePath, mode = "text") => {
// //   return new Promise((resolve, reject) => {
// //     console.log("Using Python:", PYTHON_PATH);
// //     console.log("Using script:", SCRIPT_PATH);

// //     const py = spawn(PYTHON_PATH, [SCRIPT_PATH], {
// //       stdio: ["pipe", "pipe", "pipe"],
// //       windowsHide: true
// //     });

// //     const payload = { file_path: filePath, mode };

// //     let stdout = "";
// //     let stderr = "";

// //     py.stdin.write(JSON.stringify(payload));
// //     py.stdin.end();

// //     py.stdout.on("data", (data) => {
// //       stdout += data.toString();
// //     });

// //     py.stderr.on("data", (data) => {
// //       stderr += data.toString();
// //     });

// //     py.on("close", (code) => {
// //       if (stderr) {
// //         console.error("PYTHON STDERR:\n", stderr);
// //         return reject(stderr);
// //       }

// //       if (!stdout.trim()) {
// //         return reject("Python returned empty output");
// //       }

// //       try {
// //         resolve(JSON.parse(stdout));
// //       } catch (err) {
// //         reject("Invalid JSON from Python:\n" + stdout);
// //       }
// //     });
// //   });
// // };

// // module.exports = runSummarizer;

// const { spawn } = require("child_process");
// const path = require("path");

// const PYTHON_PATH = process.env.PYTHON_PATH;
// if (!PYTHON_PATH) {
//   throw new Error("PYTHON_PATH not set in .env");
// }

// const SCRIPT_PATH = path.resolve(
//   __dirname,
//   "../../ai_service/pdf_summarizer.py"
// );

// const runSummarizer = (filePath, mode = "text") => {
//   return new Promise((resolve, reject) => {
//     const py = spawn(PYTHON_PATH, [SCRIPT_PATH, filePath, mode], {
//       windowsHide: true
//     });

//     let stdout = "";
//     let stderr = "";

//     py.stdout.on("data", (data) => {
//       stdout += data.toString();
//     });

//     py.stderr.on("data", (data) => {
//       stderr += data.toString();
//     });

// //     py.on("close", () => {
// //       // if (stderr) {
// //       //   console.error("PYTHON STDERR:\n", stderr);
// //       //   return reject(stderr);
// //       // }
// //       if (stderr) {
// //   console.warn("PYTHON WARNING:\n", stderr);
// //   // do NOT reject — warnings are allowed
// // }

// //       if (!stdout.trim()) {
// //         return reject("Python returned empty output");
// //       }

// //       try {
// //         resolve(JSON.parse(stdout));
// //       } catch {
// //         reject("Invalid JSON from Python:\n" + stdout);
// //       }
// //     });

// py.on("close", () => {
//   if (stderr) {
//     console.warn("PYTHON WARNING:\n", stderr);
//   }

//   if (!stdout.trim()) {
//     return reject("Python returned empty output");
//   }

//   try {
//     resolve(JSON.parse(stdout));
//   } catch {
//     reject("Invalid JSON from Python:\n" + stdout);
//   }
// });

//   });
// };

// module.exports = runSummarizer;


// const { spawn } = require("child_process");
// const path = require("path");

// const PYTHON_PATH = process.env.PYTHON_PATH;
// if (!PYTHON_PATH) throw new Error("PYTHON_PATH not set");

// const SCRIPT_PATH = path.resolve(
//   __dirname,
//   "../../ai_service/pdf_summarizer.py"
// );

// module.exports = (filePath, mode = "medium") =>
//   new Promise((resolve, reject) => {
//     const py = spawn(PYTHON_PATH, [SCRIPT_PATH, filePath, mode]);

//     let out = "";
//     let err = "";

//     py.stdout.on("data", d => (out += d));
//     py.stderr.on("data", d => (err += d));

//     py.on("close", () => {
//       if (!out.trim()) return reject("Python returned empty output");

//       try {
//         resolve(JSON.parse(out));
//       } catch {
//         reject("Invalid JSON from Python");
//       }
//     });
//   });


const { spawn } = require("child_process");
const path = require("path");

const PYTHON_PATH = process.env.PYTHON_PATH;
if (!PYTHON_PATH) throw new Error("PYTHON_PATH not set");

const SCRIPT_PATH = path.resolve(
  __dirname,
  "../../ai_service/pdf_summarizer.py"
);

/**
 * Run Python summarizer
 * @param {string} filePath
 * @param {string} mode - short | medium | detailed
 * @param {number|null} startPage
 * @param {number|null} endPage
 */
module.exports = (filePath, mode = "medium", startPage = null, endPage = null) =>
  new Promise((resolve, reject) => {

    // 🔹 Build Python arguments dynamically
    const args = [SCRIPT_PATH, filePath, mode];

    if (startPage !== null && endPage !== null) {
      args.push(String(startPage));
      args.push(String(endPage));
    }

    console.log("🐍 Running Python with args:", args);

    const py = spawn(PYTHON_PATH, args);

    let out = "";
    let err = "";

    py.stdout.on("data", d => (out += d.toString()));
    py.stderr.on("data", d => (err += d.toString()));

    py.on("close", () => {
      if (err) {
        console.error("🐍 Python stderr:", err);
      }

      if (!out.trim()) {
        return reject("Python returned empty output");
      }

      try {
        resolve(JSON.parse(out));
      } catch (e) {
        console.error("🐍 Raw Python output:", out);
        reject("Invalid JSON from Python");
      }
    });
  });
