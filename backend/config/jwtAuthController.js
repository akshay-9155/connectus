import jwt from 'jsonwebtoken';

export const jwtTokenAuthentication = async (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({"message": "Token not found", success: false});
    }
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
    next();
}

export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 30000});
} 