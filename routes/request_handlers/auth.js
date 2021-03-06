const signup = async (req, res, next) => {
  const { password, ...responseData } = req.user.toJSON();

  res.json({
    message: "Signup successful",
    user: responseData,
  });
};

module.exports = {
  signup,
};
