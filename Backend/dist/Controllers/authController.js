var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
export const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        // Check if user already exists
        const existingUser = yield User.findOne({ where: { email } });
        if (existingUser)
            return res.status(401).json({ message: "User already exists" });
        // Hash the password
        const hashedPassword = yield bcrypt.hash(password, 10);
        const newUser = yield User.create({
            username,
            email,
            password: hashedPassword,
        });
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ message: "Server error", error: error });
    }
});
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find user
        const user = yield User.findOne({ where: { email } });
        if (!user)
            return res.status(401).json({ message: "Invalid Credentials" });
        // Compare passwords
        const isMatch = yield bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: "Invalid Credentials" });
        // Generate JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
        // Send token + user 
        return res.json({
            token,
            user: {
                id: user.id,
                name: user.username,
                email: user.email,
            },
        });
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error", error: error });
    }
});
//# sourceMappingURL=authController.js.map