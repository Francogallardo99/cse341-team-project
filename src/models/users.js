import user from "./schemas/users.js";
import role from "./schemas/roles.js";
import bcrypt from "bcrypt";

export async function createUser({ displayName, username, email, password }) {
    const customerRole = await role.findOne({ name: "customer" });
    if (!customerRole) {
        throw new Error("Default role not found");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = await user.create({
        displayName,
        username,
        email,
        passwordHash,
        role: customerRole._id,
    });

    return newUser._id.toString();
}

export async function findUserByEmail(email) {
    return user.findOne({ email: email.trim().toLowerCase() }).populate("role");
}

export async function findUserByUsername(username) {
    return user.findOne({ username: username.trim().toLowerCase() });
}

export async function verifyPassword(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
}