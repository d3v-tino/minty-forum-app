export interface Content {
    id: string;
    title?: string;
    body: string;
    parent_id?: string;
    created_at?: Date;
    likes_count?: number;
    updated_at?: Date;
    author: {
        id: string;
        username: string;
    }
}