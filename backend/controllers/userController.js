// Standard response
const handleResponse = (res, _status, message, data = null) => {
  res.status(_status).json({
    _status,
    message,
    data,
  });
};

// login user
export const loginUser = async (req, res) => {
  res.json({ mssg: "login user" });
};

// signup user
export const signupUser = async (req, res) => {
  res.json({ mssg: "signup user" });
};
