import * as crypto from 'crypto';

export default function criptografarInfo(userId, data) {
  const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');
  const iv = Buffer.from(process.env.IV, 'hex');

  const obj = {
    data,
    userId,
  };

  const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);

  let encryptedData = cipher.update(JSON.stringify(obj), 'utf-8', 'hex');

  encryptedData += cipher.final('hex');

  return encryptedData;
}
