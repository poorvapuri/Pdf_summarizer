const { spawn } = require("child_process");

module.exports = (filePath) => {
  return new Promise((resolve, reject) => {
    const py = spawn("python", ["ai_service/pdf_summarizer.py"]);

    py.stdin.write(JSON.stringify({ file_path: filePath }));
    py.stdin.end();

    let output = "";

    py.stdout.on("data", data => output += data.toString());
    py.stderr.on("data", err => reject(err.toString()));

    py.on("close", () => resolve(JSON.parse(output)));
  });
};
