const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();
const { mongoConnection } = require("./database/mongodb.connection");
const { userRouter } = require("./routes/user.routes");
const { urlRouter } = require("./routes/url.routes");
const { logger } = require("./middlewares/winstonLogger");
app.use(cors());
app.use(
  cors({
    origin: "http://127.0.0.1:5501", // Specify the allowed origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify allowed HTTP methods
    // credentials: true, // Allow credentials (if required)
  })
);
app.use(express.json());
app.use((req, res, next) => {
  // Pass the logger object to the request object
  const { method, originalUrl, ip, headers, body } = req;
  const userAgent = headers["user-agent"];
  const timestamp = new Date().toISOString();
  const requestId = req.headers["request-id"];
  req.logger = logger;
  logger.info(
    `----NORMAL---- URL Action - Method: ${method}, URL: ${originalUrl}, IP: ${ip}, User Agent: ${userAgent}`
  );

  logger.info(
    `----DETAILED---- URL Action - Timestamp: ${timestamp}, Method: ${method}, URL: ${originalUrl}, IP: ${ip}, User Agent: ${userAgent}, Request Body: ${JSON.stringify(
      body
    )}, Request ID: ${requestId}`
  );

  next();
});
// winston logger
app.use("/user", userRouter);
app.use("/url", urlRouter);

//home route
app.get("/", async (req, res) => {
  try {
    return res.status(200).json({
      message: "home route",
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

app.listen(process.env.PORT, async () => {
  try {
    await mongoConnection;
    console.log("connected to db ");
  } catch (err) {
    console.log("error | connection", err);
  }
  console.log(`server started @ http://localhost:${process.env.PORT}`);
});
