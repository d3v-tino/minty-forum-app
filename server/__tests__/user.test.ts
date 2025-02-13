import request from "supertest";
import {app} from "../app";
import {beforeEach} from "@jest/globals";
import bcrypt from "bcryptjs";
import supabase from "../config/supabase";
import { findUserByColumn} from "../services/userService";

const apiEndpoint = "/api/v1";

describe("Tests for /users", () => {

    const testUser = {
        email: "test123@test.com",
        username: "test123",
        password: "test123123",
    }

    beforeEach(async () => {
        const hashedPassword = await bcrypt.hash(testUser.password, 10)

        await supabase.from("users").insert([{
            email: testUser.email,
            username: testUser.username,
            password_hash: hashedPassword }
        ]);
    });

    test("Test get current user", async () => {
        const userInstance = await findUserByColumn("username", testUser.username);
        if (!userInstance) { throw new Error("No user found!"); }

        const response = await request(app)
            .get(`${apiEndpoint}/users/${userInstance.id}`);

        expect(response.status).toBe(200);

    });
});