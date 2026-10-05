const crypto = require("crypto");

const users = [];
const activeTokens = new Set();

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function register(username, password) {
  if (!username || !password) {
    throw new Error("Invalid username or password");
  }
  const exists = users.some(u => u.username === username);
  if (exists) {
    throw new Error("User already exists");
  }
  const user = { username, password: hashPassword(password) };
  users.push(user);
  return { username: user.username };
}

function login(username, password) {
  if (!username || !password) {
    throw new Error("Invalid username or password");
  }
  const hashedPassword = hashPassword(password);
  const user = users.find(u => u.username === username && u.password === hashedPassword);
  if (!user) {
    return null;
  }
  const token = crypto.randomBytes(16).toString("hex");
  activeTokens.add(token);
  return { username: user.username, token };
}

function validateToken(token) {
  if (!token || typeof token !== "string") {
    return false;
  }
  return activeTokens.has(token);
}

function logout(token) {
  if (activeTokens.has(token)) {
    activeTokens.delete(token);
    return true;
  }
  return false;
}

module.exports = {
  register,
  login,
  logout,
  validateToken,
  hashPassword,
  users,
  activeTokens
};
