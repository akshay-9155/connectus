import jwt from 'jsonwebtoken';

export const jwtTokenAuthentication = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            success: false,
            error: 'Authorization token required'
        });
    }

    const token = authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'Token not found'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                error: 'Token has expired, please log in again'
            });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                error: 'Invalid token'
            });
        }
        console.error('Token verification error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error during token verification'
        });
    }
};

export const generateToken = (payload) => {
    // Token expiration is set to a configurable value via the environment variable
    const tokenExpiry = process.env.JWT_EXPIRATION || '30m'; // Default is 30 minutes
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: tokenExpiry });
};
