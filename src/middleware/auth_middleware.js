const jwt = require('jsonwebtoken');

const isTokenValid = token => jwt.verify(token, process.env.JWT_KEY);

export const authenticateUser = (req, res, next) => {
    let token;
    // check header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            message: 'Authentication invalid.',
        });
    }
    try {
        const payload = isTokenValid(token);

        // Attach the user and its permissions to the req object
        req.user = {
            userId: payload.userId,
            role: payload.role,
        };

        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Authentication invalid.',
        });
    }
};

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'Unauthorized to access this route.',
            });
        }
        next();
    };
};
