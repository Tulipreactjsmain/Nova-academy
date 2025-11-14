import jwt from 'jsonwebtoken';

export function generateToken(user: { _id: string; _role: string }): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign(
        { id: user._id, role: user._role },
        secret,
        { expiresIn: '1h' }
    );
}
