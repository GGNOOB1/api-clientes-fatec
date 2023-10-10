import * as crypto from 'crypto';

export default function descriptografarInfo(encryptedData) {
  const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');
  const iv = Buffer.from(process.env.IV, 'hex');

  const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv);

  let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');

  decryptedData += decipher.final('utf-8');

  return JSON.parse(decryptedData);
}
