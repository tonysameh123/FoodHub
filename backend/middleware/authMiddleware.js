const jwt = require('jsonwebtoken');
const User = require('../models/User');

// حماية الـ routes
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && 
      req.headers.authorization.startsWith('Bearer')) {
    try {
      // استخراج الـ token
      token = req.headers.authorization.split(' ')[1];
      
      // التحقق من الـ token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // جيب بيانات المستخدم
      req.user = await User.findById(decoded.id).select('-password');
      
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// التحقق إن المستخدم Admin
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access only' });
  }
};

module.exports = { protect, adminOnly };