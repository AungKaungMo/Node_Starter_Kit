const CONFIG = {
  env: process.env.NODE_ENV || "development",
  debug: process.env.APP_DEBUG === "true",
  port: parseInt(process.env.PORT || "3000"),
  origin: process.env.APP_ORIGIN || "5143",
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET || "abc123",
  jwt_secret: process.env.JWT_SECRET || "abc123",
};

export default CONFIG;
