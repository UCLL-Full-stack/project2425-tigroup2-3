import { error } from "console";

export class User {
    private id?: number;
    private username!: string;
    private password!: string;

    constructor(user: {
        id?: number,
        username: string, 
        password: string
    }) {
        // Use setters to initialize the properties
        if (user.id !== undefined) {
            this.setId(user.id);
        }
        this.setUsername(user.username);
        this.setPassword(user.password);
    }

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getPassword(): string {
        return this.password;
    }

    equals(user: User): boolean {
        return this.username === user.getUsername();
    }

    public setId(id: number): void {
        this.id = id;
    }

    public setUsername(username: string): void {
        if (!username || username.trim() === '') {
            throw new Error('Username is required');
        }
        this.username = username;
    }

    public setPassword(password: string): void {
        if (!password || password.trim() === '') {
            throw new Error('Password is required');
        }
        if (password.length <= 6) {
            throw new Error("Password must be at least 6 characters long");
        }
        this.password = password;
    }
}