// middlewares/checkRole.js
module.exports = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).send("Vous devez être connecté.");
        }

        if (req.user.role !== requiredRole) {
            return res.status(403).send("Accès interdit.");
        }

        next();
    };
};
