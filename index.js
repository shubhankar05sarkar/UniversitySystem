const fs = require('fs');

function readJSONFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading file:", err);
    return null;
  }
}

function writeJSONFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log("File successfully written!");
  } catch (err) {
    console.error("Error writing file:", err);
  }
}

function backupFile(filePath) {
  try {
    const backupPath = `${filePath}.backup`;
    fs.copyFileSync(filePath, backupPath);
    console.log("Backup created at", backupPath);
  } catch (err) {
    console.error("Error creating backup:", err);
  }
}

function addEntry(data, path, newEntry) {
  let target = data;
  for (const key of path) {
    if (!target[key]) target[key] = [];
    target = target[key];
  }
  target.push(newEntry);
}

function main() {
  const filePath = './data.json';

  backupFile(filePath);

  const data = readJSONFile(filePath);

  if (data) {
    addEntry(data, ['departments', 0, 'professors', 0, 'students'], {
      name: "Charlie",
      id: "CS103"
    });

    writeJSONFile(filePath, data);
  }
}

main();
