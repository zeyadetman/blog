const passport = require("passport");

const authMiddleWare = passport.authenticate("jwt", { session: false });
module.exports = { authMiddleWare };
