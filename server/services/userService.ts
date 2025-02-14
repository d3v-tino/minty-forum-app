import supabase from "../config/supabase";
import { User } from "../models/User";

export const findUserByColumn = async (column: string, value: string): Promise<User | null> => {
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq(column, value)
        .single();

    if (error || !data) return null;
    return data as User;
};
