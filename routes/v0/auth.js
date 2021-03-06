const { signup } = require("../request_handlers/auth");
const passport = require("passport");
const jwt = require("jsonwebtoken");

module.exports = (app) => {
  /**
   * @swagger
   * /signup:
   *  post:
   *    tags:
   *      - Admin
   *    description: Admin Signup
   *    summary: Admin Signup
   *    responses:
   *      '200':
   *        description: Admin Signup
   */
  app.post(
    "/signup",
    passport.authenticate("signup", { session: false }),
    signup
  );

  /**
   * @swagger
   * /login:
   *  post:
   *    tags:
   *      - Admin
   *    description: Admin Login
   *    summary: Admin Login
   *    responses:
   *      '200':
   *        description: Admin Login
   */
  app.post("/login", async (req, res, next) => {
    passport.authenticate("login", async (err, user, info) => {
      try {
        if (!user && info) {
          return res.status(info.status).json({ message: info.message });
        }

        if (err || !user) {
          const error = new Error("An error occurred.");

          return res.status(500).send({ message: error.message });
        }

        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);

          const body = {
            _id: user._id,
            username: user.username,
          };

          const token = jwt.sign({ user: body }, process.env.API_SECRET_KEY);

          return res.json({ token });
        });
      } catch (error) {
        return res.status(500).send({ message: error.message });
      }
    })(req, res, next);
  });
};
