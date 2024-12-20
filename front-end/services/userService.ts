import {User} from "@types"

const loginUser = (user: User) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};

const registerUser = (user: User) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};

const UserService = {
    loginUser, registerUser
}

export default UserService;