const { execSync } = require("child_process");
const fs = require("fs");

// Number of days to go back
const totalDays = 142;
const commitsPerDay = 3;
const commitMessages = [
  "Fixed a bug",
  "Updated documentation",
  "Refactored some code",
  "Improved performance",
  "Fixed typo in README",
  "Added a new feature",
  "Refactored function names",
  "Updated dependencies"
];

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
    execSync(
      `GIT_COMMITTER_DATE="${timestamp}" git commit --date="${timestamp}" -m "${getRandomMessage()}"`
    );

    console.log(`Committed on: ${timestamp}`);
  }
}

console.log("✅ All backdated commits created successfully!");
