const { execSync } = require("child_process");
const fs = require("fs");

// Number of commits you want
const totalCommits = 100; // Adjust as needed
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

// Function to get a random past date from the last 300 days
function getRandomPastDate() {
  const daysAgo = Math.floor(Math.random() * 300); // Random number from 0 to 299
  const randomDate = new Date();
  randomDate.setDate(randomDate.getDate() - daysAgo);
  return randomDate.toISOString();
}

// Function to get a random commit message
function getRandomMessage() {
  return commitMessages[Math.floor(Math.random() * commitMessages.length)];
}

for (let i = 0; i < totalCommits; i++) {
  const timestamp = getRandomPastDate();
  fs.writeFileSync("dummy.txt", `Commit for ${timestamp}\n`, { flag: "a" });

  execSync("git add .");
  execSync(
    `GIT_COMMITTER_DATE="${timestamp}" git commit --date="${timestamp}" -m "${getRandomMessage()}"`
  );

  console.log(`Committed on: ${timestamp}`);
}

console.log("✅ All random backdated commits created successfully!");
