import User from "../models/User";

export default function createTokenUser(user: User) {
    return { username: user.username, userId: user.id };
}
