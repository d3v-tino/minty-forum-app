import { app } from "../app";
import request from "supertest";
import dotenv from "dotenv";
import supabase from "../config/supabase";
import {response} from "express";
import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import bcrypt from "bcryptjs";
import {findContentByColumn} from "../services/contentService";

dotenv.config({ path: ".env.test" });

const apiEndpoint = "/api/v1";

describe("Tests for endpoints at /auth", () => {

    const testComment = {
        body: "test comment",
        parent_id: null,
    }

    const testPost = {
        title: "test post",
        body: "test post content",
    }

    beforeAll(async () => {
        const hashedPassword = await bcrypt.hash("content_secret123", 10)

        const { data: user, error: userError } = await supabase
            .from("users")
            .insert([{
                email: "contentuser@example.com",
                username: "contentUser",
                password_hash: hashedPassword
            }])
            .select("id")
            .single();

        if (userError) {
            console.error("Error inserting test user:", userError);
            throw new Error("Failed to create test user");
        }

        const { data: post, error: postError } = await supabase
            .from("content")
            .insert([{
                title: testPost.title,
                body: testPost.body,
                author_id: user.id,
            }])
            .select("id")
            .single();

        if (postError) {
            console.error("Error inserting test post:", postError);
            throw new Error("Failed to create test post - " + postError.message);
        }

        const { error: commentError } = await supabase
            .from("content")
            .insert([{
                body: testComment.body,
                author_id: user.id,
                parent_id: post.id,
            }]);

        if (commentError) console.error("Error inserting comment:", commentError);

    });

    afterAll(async () => {
        await supabase.from("content").delete().gt("created_at", "1900-01-01");
        await supabase.from("users").delete().gt("created_at", "1900-01-01");
        app.listen().close();
    });

    test("test get posts", async () => {
        const postInstance = await findContentByColumn("body", testPost.body);
        if (!postInstance) { throw new Error("No posts found!"); }

         const response = await request(app).get(`${apiEndpoint}/content/posts`);

        expect(response.status).toBe(200);
    });

    test("test get comments", async () => {
        const response = await request(app)
            .get(`${apiEndpoint}/content/comments/${testComment.parent_id}`)

        expect(response.status).toBe(200);
    });

    test("test create content", async () => {
        const response = await request(app)
            .post(`${apiEndpoint}/content/create`)
            .send({
                body: "test content",
            });

        expect(response.status).toBe(201);
    });

})