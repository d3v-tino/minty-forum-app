export interface User {
    id: string; // UUID
    email: string;
    username: string;
    password_hash: string;
    avatar_url?: string;
    created_at: string;
    updated_at: string;
}