import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import passport2 from 'passport-github2';
import { getConnection } from './db/connect.js';
import categoryRouter from './route/category.js';
import productRouter from './route/product.js';
import authRoute from './route/auth.js';
import isAuthenticated from './middleware/isAuth.js';
import createHttpError from 'http-errors';
import { errorHandler } from './middleware/errorHandler.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerDoc } from './swagger/swagger.js';

const app = express();

const PORT = process.env.PORT || 5000;

const GithubStrategy = passport2.Strategy;

app.use(express.json());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, x-Requested-With, Content-type, Accept, z-Key, Authorization',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST, GET, PUT, PATCH, OPTIONS, DELETE',
  );
  next();
});
app.use(cors({ methods: ['GET', 'POST', 'UPDATE', 'DELETE', 'PUT', 'PATCH'] }));
app.use(cors({ origin: '*' }));

// Use the userRoute for handling requests to /users
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, {
    customJsStr: `
      (() => {
        const addAuthControls = () => {
          const topbar = document.querySelector('.topbar-wrapper');
          if (!topbar || topbar.querySelector('.swagger-auth-controls')) return;

          const controls = document.createElement('div');
          controls.className = 'swagger-auth-controls';
          controls.style.display = 'flex';
          controls.style.gap = '8px';
          controls.style.marginLeft = '12px';

          const authorize = document.createElement('button');
          authorize.className = 'btn authorize';
          authorize.textContent = 'Authorize with GitHub';
          authorize.onclick = () => {
            window.location.href = '/login';
          };

          const logout = document.createElement('button');
          logout.className = 'btn authorize';
          logout.textContent = 'Logout';
          logout.onclick = () => {
            window.location.href = '/logout';
          };

          controls.append(authorize, logout);
          topbar.appendChild(controls);
        };

        new MutationObserver(addAuthControls).observe(document.body, {
          childList: true,
          subtree: true,
        });
        addAuthControls();
      })();
    `,
    swaggerOptions: {
      requestInterceptor: (request) => {
        request.credentials = 'include';
        return request;
      },
    },
  }),
);
app.get('/api/v1/docs.json', (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDoc);
});
app.use('/category', isAuthenticated, categoryRouter);
app.use('/product', isAuthenticated, productRouter);
app.use('/', authRoute);

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://127.0.0.1:5000/github/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        return done(null, profile);
      });
    },
  ),
);

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

app.get('/', (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : 'Logged out',
  );
});

app.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/api-docs',
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  },
);
// ---------- 404 ----------
app.use((req, res, next) => {
  next(createHttpError(404, 'Route not found'));
});

app.use(errorHandler);

// Start the server after establishing a database connection
const startServer = async () => {
  try {
    console.log('🔄 Initializing database connection...');
    await getConnection();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start the server:', error);
    process.exit(1);
  }
};

startServer();
