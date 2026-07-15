import "dotenv/config";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors, { type CorsOptions } from "cors";
import { roomStore } from "./rooms";
import { registerSocketHandlers } from "./socket-handlers";

const parseAllowedOrigins = (): string[] => {
  const rawOrigins = process.env.CLIENT_ORIGINS || process.env.CLIENT_ORIGIN || "";
  return rawOrigins
    .split(",")
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);
};

const allowedOrigins = parseAllowedOrigins();
const corsOrigin: CorsOptions["origin"] = (origin, callback) => {
  // Allow same-origin and non-browser requests.
  if (!origin) {
    return callback(null, true);
  }

  if (allowedOrigins.length === 0 && process.env.NODE_ENV !== "production") {
    return callback(null, true);
  }

  if (allowedOrigins.includes(origin)) {
    return callback(null, true);
  }

  return callback(new Error("CORS origin is not allowed"));
};

const app = express();
app.set("trust proxy", 1);
app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});

// --- Health check ---
app.get("/healthz", (_, res) => res.json({ status: "ok" }));

// --- REST endpoint for room creation (optional, frontend could also use socket) ---
app.post("/create-room", (req, res) => {
  const room = roomStore.createRoom();
  res.json({ roomCode: room.code });
});

// --- Cleanup loop (inactive rooms auto-delete) ---
setInterval(() => {
  roomStore.cleanupInactiveRooms(60 * 60 * 1000); // 1h inactivity
}, 5 * 60 * 1000);

// --- Socket.io handling ---
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  registerSocketHandlers(io, socket);
});

const PORT = Number(process.env.PORT) || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
