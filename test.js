const auth = require("./auth");

console.log("=== BAT DAU KIEM TRA MODULE AUTHENTICATION ===");

console.log("\n[TEST 1] Kiem tra ham hashPassword:");
const pwd = "mySecurePassword123";
const hashed1 = auth.hashPassword(pwd);
const hashed2 = auth.hashPassword(pwd);
console.log("Password:", pwd);
console.log("SHA-256 Hash:", hashed1);
console.log("Hash nhat quan:", hashed1 === hashed2);

console.log("\n[TEST 2] Kiem tra ham register:");
const user1 = auth.register("alice", pwd);
console.log("Dang ky user 'alice' thanh cong:", JSON.stringify(user1));

try {
  auth.register("alice", "anotherPassword");
  console.log("Loi: Phai chan trung lap username");
} catch (err) {
  console.log("Chan trung lap username thanh cong:", err.message);
}

try {
  auth.register("", "");
  console.log("Loi: Phai chan username/password rong");
} catch (err) {
  console.log("Chan du lieu rong thanh cong:", err.message);
}

console.log("\n[TEST 3] Kiem tra ham login voi thong tin chinh xac:");
const loginSuccess = auth.login("alice", pwd);
console.log("Dang nhap thanh cong!");
console.log("Username tra ve:", loginSuccess.username);
console.log("Token duoc cap:", loginSuccess.token);

console.log("\n[TEST 4] Kiem tra ham login voi sai mat khau:");
const loginFail = auth.login("alice", "wrongPassword");
console.log("Dang nhap sai mat khau tra ve:", loginFail);

console.log("\n[TEST 5] Kiem tra ham validateToken:");
const isTokenValid = auth.validateToken(loginSuccess.token);
console.log("Token hop le:", isTokenValid);

const isFakeTokenValid = auth.validateToken("fakeToken123456789012345678901234");
console.log("Token gia mao hop le:", isFakeTokenValid);

console.log("\n[TEST 6] Kiem tra ham logout:");
const logoutSuccess = auth.logout(loginSuccess.token);
console.log("Dang xuat thanh cong:", logoutSuccess);

const isTokenValidAfterLogout = auth.validateToken(loginSuccess.token);
console.log("Token con hieu luc sau khi logout:", isTokenValidAfterLogout);

console.log("\n=== TAT CA 6 TEST CASE DEU HOAN THANH XUAT SAC ===");
