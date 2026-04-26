module.exports = function handler(req, res) {
  res.status(200).json({ 
    status: 'ok', 
    message: 'AI CV Checker API is running on Vercel' 
  });
};

