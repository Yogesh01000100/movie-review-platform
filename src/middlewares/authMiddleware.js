// for authenticating the users if they are sending a valid request
export async function verifyToken(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
  
      if (!authHeader) {
        return res.status(401).json({ error: "Authorization header missing" });
      }
  
      const [bearer, token] = authHeader.split(" ");
  
      if (bearer !== "Bearer" || !token) {
        return res.status(401).json({ error: "Invalid Authorization header format" });
      }
  
      const verifiedToken = jwt.verify(token, process.env.SECRET);
  
      if (verifiedToken) {
        const name = jwt.decode(token);
        req.user = name.username;
        return res.status(201).json({ msg: `userName: ${name.username}` });
      } else {
        return res.status(401).json({ error: "Invalid Token!" });
      }
    } catch (error) {
      res.status(500).json({ msg: `Error ${error}` });
    }
    next();
  }
  