const bcrypt = require("bcryptjs");

const passwords = ["pw1", "pw2", "pw3"];
const saltRounds = 10;

async function generateHashes() {
  for (const pw of passwords) {
    const hash = await bcrypt.hash(pw, saltRounds);
    console.log(`'${hash}',`);
  }
}

generateHashes();
