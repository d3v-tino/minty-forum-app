export interface User {
    id: string;
    email: string;
    username: string;
    password?: string;
    avatar_url: string;
    created_at: Date;
    updated_at: Date;
}