import { describe, expect, test, beforeEach, afterAll } from '@jest/globals';
import supabase from "../config/supabase";
import request from "supertest";
import {app} from "../app";
import {findContentByColumn} from "../services/contentService";
import {body} from "express-validator";

const apiEndpoint = "/api/v1";

const testComment = {
    body: "test comment",
    parent_id: null,
}

const testPost = {
    title: "test post",
    body: "test post content",
}

describe("Tests for endpoints at /content", () => {

    beforeAll(async () => {
        await supabase.from("content").insert([{
            body: testComment.body,
        }]);

        await supabase.from("content").insert([{
            title: testPost.title,
            body: testPost.body,
        }]);
    })

    afterAll(async () => {
        await supabase.from("content").delete().gt("created_at", "1900-01-01");
        app.listen().close();
    });

    test("test create content", async () => {
        const response = await request(app)
            .post(`${apiEndpoint}/content/create`)
            .set("Content-Type", "application/json") // Ensure JSON content type
            .send({
                body: "test content",
            })
            .expect("Content-Type", /json/); // Ensure response is JSON

        // Debugging logs
        console.log("Response status:", response.status);
        console.log("Response body:", response.body);

        expect(response.status).toBe(201);
    });

    test("test get posts", async () => {
        const postInstance = await findContentByColumn("title", testPost.title);
        if (!postInstance) { throw new Error("No posts found!"); }

        const response = await request(app)
            .get(`${apiEndpoint}/content/posts`);

        expect(response.status).toBe(200);
    })

    test("test get posts", async () => {
        const postInstance = await findContentByColumn("title", testPost.title);
        if (!postInstance) { throw new Error("No posts found!"); }

        const response = await request(app)
            .get(`${apiEndpoint}/content/posts`);

        console.log(response.body);
        expect(response.status).toBe(200);
    });

    test("test get comments", async () => {
        const commentInstance = await findContentByColumn("body", testPost.body);
        if (!commentInstance) { throw new Error("No posts found!"); }

        const postInstance = await findContentByColumn("title", testPost.title);
        if (!postInstance) { throw new Error("No posts found!"); }

        const { error } = await supabase
            .from("content")
            .update({ parent_id: postInstance.id })
            .eq("id", commentInstance.id)
            .select();

        if (error) {
            throw new Error(`Failed to update comment parent_id: ${error.message}`);
        }

        const response = await request(app)
            .get(`${apiEndpoint}/content/comments/${postInstance.id}`)

        expect(response.status).toBe(200);
    });


})




