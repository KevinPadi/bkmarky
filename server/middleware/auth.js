import { getAuth } from "@clerk/express";

const requireAuth = (req, res, next) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized - Please log in" });
  }

  req.userId = userId;
  next();
};

module.exports = { requireAuth };
