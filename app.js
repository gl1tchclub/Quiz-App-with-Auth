import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
// Import the index routes module
import indexRoutes from './routes/app.js';

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again in 15 minutes",
});


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

app.use(setXPoweredBy);
app.use(setXContentTypeOptions);
app.use(setXFrameOptions);
app.use(setContentSecurityPolicy);
app.use(limiter);

// Use the routes module
app.use('/', indexRoutes);

app.use(cors());
app.use(helmet());

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is listening on port 3000.');
});

// Export the Express application. Other modules may use it. For example, API testing
export default app;