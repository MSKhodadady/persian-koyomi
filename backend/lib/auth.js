const jose = require("jose");
const secretStr = process.env.JWT_SECRET,
  secret = new TextEncoder().encode(secretStr);

/**
 *
 * @param {string} username
 * @param {number} userId
 * @returns
 */
export async function generateToken(username, userId) {
  const alg = "HS256",
    expireTime = process.env.JWT_EXPIRE_TIME ?? "2h";

  const jwt = await new jose.SignJWT({ username, userId })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(expireTime)
    .sign(secret);

  return jwt;
}

/**
 *
 * @param {string} jwt
 * @returns
 */
export async function verify(jwt) {
  try {
    const payload = await jose.jwtVerify(jwt, secret);
    return payload;
  } catch (error) {}
}
