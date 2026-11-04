import fs from 'fs';
import zlib from 'zlib';

// Minimal pure Node.js PNG encoder
function encodePNG(width, height, rgbaBuffer) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // bit depth 8
  ihdr.writeUInt8(6, 9); // color type 6: RGBA
  ihdr.writeUInt8(0, 10); // compression
  ihdr.writeUInt8(0, 11); // filter
  ihdr.writeUInt8(0, 12); // interlace

  const ihdrChunk = makeChunk('IHDR', ihdr);

  // Scanlines with filter byte 0
  const scanlines = Buffer.alloc(height * (width * 4 + 1));
  for (let y = 0; y < height; y++) {
    const rowOffset = y * (width * 4 + 1);
    scanlines[rowOffset] = 0; // Filter 0 (None)
    rgbaBuffer.copy(scanlines, rowOffset + 1, y * width * 4, (y + 1) * width * 4);
  }

  const idatData = zlib.deflateSync(scanlines, { level: 9 });
  const idatChunk = makeChunk('IDAT', idatData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(4 + 4 + len + 4);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const crc = crc32(chunk.subarray(4, 8 + len));
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

// CRC32 table
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

// Generate the beautiful USTAZ violet-gold icon at specified size
function generateUstazIcon(size) {
  const buf = Buffer.alloc(size * size * 4);

  const cx = size / 2;
  const cy = size / 2;
  const cornerRadius = size * 0.22;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;

      // Rounded rectangle test
      const dx = Math.max(0, Math.abs(x - cx) - (cx - cornerRadius));
      const dy = Math.max(0, Math.abs(y - cy) - (cy - cornerRadius));
      const distFromCorner = Math.sqrt(dx * dx + dy * dy);

      if (distFromCorner > cornerRadius) {
        // Transparent outside rounded corner
        buf[idx] = 0;
        buf[idx + 1] = 0;
        buf[idx + 2] = 0;
        buf[idx + 3] = 0;
        continue;
      }

      // Background radial gradient from #2d1254 (center-top) to #090314 (edges)
      const gradDist = Math.hypot(x - cx, y - cy * 0.6) / (size * 0.7);
      const t = Math.min(1, Math.max(0, gradDist));

      // Interpolate colors: (45, 18, 84) to (9, 3, 20)
      let r = Math.round(45 * (1 - t) + 9 * t);
      let g = Math.round(18 * (1 - t) + 3 * t);
      let b = Math.round(84 * (1 - t) + 20 * t);
      let a = 255;

      // Subtle border glow (within 2-3% of edge)
      const isNearEdge = distFromCorner > cornerRadius - size * 0.02 ||
        (x < size * 0.02 || x > size * 0.98 || y < size * 0.02 || y > size * 0.98);
      if (isNearEdge) {
        r = Math.min(255, r + 90);
        g = Math.min(255, g + 40);
        b = Math.min(255, b + 140);
      }

      // Central emblem: "U" shape math
      // Normalized coords [-1, 1] relative to center
      const nx = (x - cx) / (size * 0.28);
      const ny = (y - (cy * 0.95)) / (size * 0.28);

      // U arms & curve
      const inLeftArm = nx >= -0.75 && nx <= -0.32 && ny >= -0.75 && ny <= 0.15;
      const inRightArm = nx >= 0.32 && nx <= 0.75 && ny >= -0.75 && ny <= 0.15;
      const inBottomArc = (nx * nx + (ny - 0.15) * (ny - 0.15) <= 0.75 * 0.75) &&
                          (nx * nx + (ny - 0.15) * (ny - 0.15) >= 0.32 * 0.32) &&
                          ny >= 0.15;

      if (inLeftArm || inRightArm || inBottomArc) {
        // Gradient for U: White/Lilac at top (#fdf4ff) to neon amethyst (#9333ea) at bottom
        const uT = (ny + 0.75) / 1.5;
        r = Math.round(250 * (1 - uT) + 147 * uT);
        g = Math.round(240 * (1 - uT) + 51 * uT);
        b = Math.round(255 * (1 - uT) + 234 * uT);
      }

      // Upward diamond/star in center of U
      const starDx = Math.abs(x - cx) / (size * 0.1);
      const starDy = Math.abs(y - cy * 0.75) / (size * 0.12);
      if (starDx + starDy <= 1.0) {
        // Glowing gold/white center star
        r = 255;
        g = 240;
        b = 255;
      }

      // Small stylized "USTAZ" bar at bottom
      if (y >= size * 0.82 && y <= size * 0.86 && Math.abs(x - cx) <= size * 0.28) {
        r = Math.min(255, r + 130);
        g = Math.min(255, g + 80);
        b = Math.min(255, b + 180);
      }

      buf[idx] = r;
      buf[idx + 1] = g;
      buf[idx + 2] = b;
      buf[idx + 3] = a;
    }
  }

  return encodePNG(size, size, buf);
}

// Generate all standard PWA resolutions
import path from 'path';

const sizes = [
  { file: path.join(process.cwd(), 'public', 'pwa-512x512.png'), size: 512 },
  { file: path.join(process.cwd(), 'public', 'pwa-192x192.png'), size: 192 },
  { file: path.join(process.cwd(), 'public', 'apple-touch-icon.png'), size: 180 },
  { file: path.join(process.cwd(), 'public', 'favicon.png'), size: 64 },
];

for (const { file, size } of sizes) {
  const png = generateUstazIcon(size);
  fs.writeFileSync(file, png);
  console.log(`Generated ${file} (${size}x${size}, ${png.length} bytes)`);
}
