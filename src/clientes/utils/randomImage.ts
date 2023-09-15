export default function getRandomImage() {
  const characters =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomString = '';
  for (let i = 0; i < 5; i++) {
    const index = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(index);
  }

  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomString}.svg`;
}
