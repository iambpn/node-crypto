// A node demo program for creating the ECDH
const crypto = require("crypto");
const algorithm = "aes-256-cbc";

/**
 *
 * @param {string} text
 * @returns
 */
function encrypt(text) {
  // Initializing the key
  const key = crypto.randomBytes(32);

  // Initializing the iv vector
  const iv = crypto.randomBytes(16);

  // Creating the cipher with the above defined parameters
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);

  // Updating the encrypted text...
  const encrypted = cipher.update(text);

  // Using concatenation
  const encryptedBuffer = Buffer.concat([encrypted, cipher.final()]);

  // Returning the iv vector along with the encrypted data
  return { iv: iv.toString("hex"), key: key.toString("hex"), encryptedData: encryptedBuffer.toString("hex") };
}

/**
 *
 * @param {{iv:string, key:string, encryptedData:string}} encObj
 * @returns
 */
function decrypt(encObj) {
  const key = Buffer.from(encObj.key, "hex");

  // previous initialization vector
  const iv = Buffer.from(encObj.iv, "hex");

  const encryptedText = Buffer.from(encObj.encryptedData, "hex");

  // Creating the decipher from algo, key and iv
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);

  // Updating decrypted text
  const decrypted = decipher.update(encryptedText);
  const decryptedBuffer = Buffer.concat([decrypted, decipher.final()]);

  // returning response data after decryption
  return decryptedBuffer.toString();
}

// Encrypting the below data and printing output
var output = encrypt("Welcome to TutorialsPoint !");
console.log("Encrypted data -- ", output);

//Printing decrypted data
console.log("Decrypted data -- ", decrypt(output));
