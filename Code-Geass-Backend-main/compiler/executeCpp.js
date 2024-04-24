const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const playgroundPath = path.join(__dirname, "../playground");

if (!fs.existsSync(playgroundPath)) {
  fs.mkdirSync(playgroundPath, { recursive: true });
}

const executeCpp = (filepath, inputData) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(playgroundPath, `${jobId}.out`);
  const inputPath = path.join(playgroundPath, `${jobId}.txt`);

  // console.log(jobId);
  // console.log(playgroundPath);
  // console.log(inputPath);
  // console.log(filepath);

  inputData = inputData.replace(/\n/g, " ");

  // const command = `touch "${inputPath}" && echo ${inputData} > "${inputPath}"`;

  // const command = `touch "${inputPath}" && echo ${inputData} > "${inputPath}" && g++ "${filepath}" -o "${outPath}" && "${outPath}" < "${inputPath}"`;

  const command = `touch "${inputPath}" && echo ${inputData} > "${inputPath}" && g++ "${filepath}" -o "${outPath}" && timeout 5s "${outPath}" < "${inputPath}"`;
  

  // console.log("hello");
  // console.log(inputData);
  // console.log("hello");
  return new Promise((resolve, reject) => {
    exec(
      command,
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
        resolve(stdout);
      }
    );
  });
};

module.exports = executeCpp