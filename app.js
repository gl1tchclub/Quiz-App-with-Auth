import express, { urlencoded, json } from "express";
import helmet from "helmet";

// import rateLimit from "express-rate-limit";
import cors from "cors";
import cacheRouteMiddleware from "./middleware/cacheRoute.js";
import compression from "compression";

// Import the index routes module
import authRouteMiddleware from "./middleware/authRoute.js";
import authV1Routes from "./routes/v1/auth.js";
import indexV1Routes from "./routes/v1/index.js";
import userV1Routes from "./routes/v1/users/user.js";
import quizV1Routes from "./routes/v1/quiz.js";
import publicQuizV1Routes from "./routes/v1/publicQuiz.js";
import seedV1Routes from "./routes/v1/users/seed.js";
//import rest of routes here

const app = express();

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per windowMs
//   message: "Too many requests from this IP, please try again in 15 minutes",
// });

const setXPoweredBy = helmet({
  hidePoweredBy: true,
});

const setXContentTypeOptions = helmet({
  contentTypes: {
    nosniff: true,
  },
});

const setXFrameOptions = helmet({
  frameguard: {
    action: "deny",
  },
});

const setContentSecurityPolicy = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'none'"],
    },
  },
});

app.use(urlencoded({ extended: false }));
app.use(json());
// app.use(limiter);
// app.use(cacheRouteMiddleware);

// CORS Config
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
// app.use(cors());
app.use(setXPoweredBy);
app.use(setXContentTypeOptions);
app.use(setXFrameOptions);
app.use(setContentSecurityPolicy);
app.use(compression());

// Use the routes module
app.use("/api/v1/auth", authV1Routes);
app.use("/api/v1/", indexV1Routes);
app.use("/api/v1/users", authRouteMiddleware, userV1Routes); // Authenticated route
app.use("/api/v1/quizzes", authRouteMiddleware, quizV1Routes);
app.use("/api/v1/public", publicQuizV1Routes);
app.use("/api/v1/seedBasicUsers", authRouteMiddleware, seedV1Routes); // Authenticated route

// Sets 404 error message if request contains an invalid route and sends to next middleware function in the stack
app.use((req, res, next) => {
  next(
    res.status(404).json({
      msg: "404 route not found",
    }),
  );
});

// Displays a written error message depending on the error found
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000.");
});

// Export the Express application. Other modules may use it. For example, API testing
export default app;
