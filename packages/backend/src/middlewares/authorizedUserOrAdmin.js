'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.authorizeUserOrAdmin = void 0;
const authorizeUserOrAdmin = () => {
  return (req, res, next) => {
    const user = req.user;
    const role = user.userRole;
    const isAdmin = role === 'Admin';
    const isSelf = user.id === req.params.id;
    if (isAdmin || isSelf) {
      next();
    } else {
      res.status(403).json({
        message: 'Forbidden: You do not have permission to perform this action.',
      });
    }
  };
};
exports.authorizeUserOrAdmin = authorizeUserOrAdmin;
