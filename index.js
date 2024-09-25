const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const dataFile = path.join(__dirname, "data.json");
const commitMessages = JSON.parse(fs.readFileSync(dataFile, "utf8"));
const totalDays = 142; // Number of days
const commitsPerDay = 3; // Number of commits per day

function getRandomMessage() {
  return commitMessages[Math.floor(Math.random() * commitMessages.length)];
}

for (let day = totalDays; day >= 0; day--) {
  const commitDate = new Date();
  commitDate.setDate(commitDate.getDate() - day); // Go back in time

  for (let i = 0; i < commitsPerDay; i++) {
    const timestamp = commitDate.toISOString();
    
    fs.writeFileSync("dummy.txt", `Commit for ${timestamp}\n`, { flag: "a" });
    
    execSync("git add .");
    
    const commitMessage = getRandomMessage();
    
    execSync(
      `GIT_COMMITTER_DATE="${timestamp}" git commit --date="${timestamp}" -m "${commitMessage}"`
    );

    console.log(`Committed: ${commitMessage} on ${timestamp}`);
  }
}

console.log("All backdated commits created successfully!");
