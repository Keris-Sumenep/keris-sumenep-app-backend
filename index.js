const express = require("express");

const app = express();

// dot env
require("dotenv").config();

// const User = require("./models/user");
// const Benda = require("./models/benda");
// const TourGate = require("./models/tourGate");
// const GambarBenda = require("./models/gambar_benda");
// const VideoBenda = require("./models/video_benda");
// const VoiceBenda = require("./models/voice_benda");
// const MaintananceBenda = require("./models/maintanance");
// const Language = require("./models/language");
// const Deskripsi = require("./models/deskripsi");

const db = require("./config/database");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/user");
const bendaRouter = require("./routes/benda");
const tourGateRouter = require("./routes/tourGate");
const gambarBendaRouter = require("./routes/gambarBenda");
const videoBendaRouter = require("./routes/videoBenda");
const voiceBendaRouter = require("./routes/voiceBenda");
const deskripsiRouter = require("./routes/deskripsi");
const languageRouter = require("./routes/language");
const settingRouter = require("./routes/setting");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const Setting = require("./models/setting");

const dbConnect = async () => {
  try {
    await db.authenticate();
    // await User.sync();
    // await Benda.sync();
    // await Language.sync();
    // await Deskripsi.sync();
    // await TourGate.sync();
    // await GambarBenda.sync();
    // await VideoBenda.sync();
    // await VoiceBenda.sync();
    // await MaintananceBenda.sync();
    // await Setting.sync();
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};

var corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", indexRouter);
app.use("/api/user", usersRouter);
app.use("/api/benda", bendaRouter);
app.use("/api/tour-gate", tourGateRouter);
app.use("/api/gambar-benda", gambarBendaRouter);
app.use("/api/video-benda", videoBendaRouter);
app.use("/api/voice-benda", voiceBendaRouter);
app.use("/api/deskripsi", deskripsiRouter);
app.use("/api/language", languageRouter);
app.use("/api/setting", settingRouter);

app.listen(7000, () => console.log("Aplikasi ini berjalan pada port 7000"));
dbConnect();
