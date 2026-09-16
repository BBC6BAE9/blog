import sharp from "sharp";
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#fafafa"/><rect x="70" y="72" width="58" height="6" fill="#2454d4"/>
<text x="70" y="160" font-family="Arial, sans-serif" font-size="26" letter-spacing="5" fill="#2454d4">HONG HUANG</text>
<text x="65" y="310" font-family="Arial, sans-serif" font-size="100" font-weight="700" letter-spacing="-4" fill="#171717">Tech Notes.</text>
<text x="70" y="390" font-family="Arial, sans-serif" font-size="32" fill="#616161">Apple platforms · AI · Software engineering</text>
<path d="M70 495H1130" stroke="#ddd"/><text x="70" y="555" font-family="Arial, sans-serif" font-size="25" fill="#616161">honghuang.foomansoft.com</text></svg>`;
await sharp(Buffer.from(svg)).png().toFile("public/og-image.png");
