import supabase from "../config/supabase";
import {Content} from "../models/Content";

export const findContentByColumn = async (column: string, value: string): Promise<Content | null> => {
    const { data, error } = await supabase
        .from("content")
        .select("*")
        .eq(column, value)
        .single();

    if (error || !data) return null;
    return data as Content;
};

export const getAllPosts = async (): Promise<Content[] | null> => {
    const { data, error } = await supabase
        .from("content")
        .select("*")
        .not("title", "is", null);

    if (error || !data) return null;
    return data as Content[];
};
