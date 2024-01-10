const whiteList = [
  "https://playful-empanada-24d002.netlify.app",
  "http://localhost:5173",
  "http://localhost:4173",
  "https://salustech.online/",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
