import request from "supertest";
import {app} from "../app";
import {beforeEach} from "@jest/globals";
import bcrypt from "bcryptjs";
import supabase from "../config/supabase";
import { findUserByColumn} from "../services/userService";

const apiEndpoint = "/api/v1";

const testUser = {
    email: "authTestUser@test.com",
    username: "authTestUser",
    password: "test123123",
}

describe("Tests for /users", () => {

    beforeEach(async () => {
        const hashedPassword = await bcrypt.hash(testUser.password, 10);

        await supabase.from("users").insert([{
            email: testUser.email,
            username: testUser.username,
            password_hash: hashedPassword }
        ]);
    });

    afterAll(async () => {
        await supabase.from("users").delete().gt("created_at", "1900-01-01");
    });

    test("Test get current user", async () => {
        const userInstance = await findUserByColumn("username", testUser.username);
        if (!userInstance) { throw new Error("No user found!"); }

        const response = await request(app)
            .get(`${apiEndpoint}/users/${userInstance.id}`);

        expect(response.status).toBe(200);

    });
});