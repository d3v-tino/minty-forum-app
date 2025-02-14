import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import supabase from "../config/supabase";
import bcrypt from "bcryptjs";
import {app} from "../app";
import dotenv from "dotenv";
import request from "supertest";

dotenv.config({ path: ".env.test" });

const apiEndpoint = "/api/v1";

describe("Tests for endpoints at /auth", () => {

    const testUser = {
        email: "test123@test.com",
        username: "test123",
        password: "test123123",
    }

    beforeAll(async () => {
        console.log("Cleaning up existing test users...");

        await supabase.from("users").delete().eq("email", testUser.email); // Ensure no duplicates

        const hashedPassword = await bcrypt.hash(testUser.password, 10);

        const { error } = await supabase.from("users").insert([
            {
                email: testUser.email,
                username: testUser.username,
                password_hash: hashedPassword,
            },
        ]);

        if (error) {
            console.error("Error inserting test user:", error);
            throw new Error("Failed to insert test user");
        }

        console.log("Test user created successfully.");
    });

    afterAll(async () => {
        console.log("Cleaning up test users...");

        const { error } = await supabase.from("users").delete().eq("email", testUser.email);

        if (error) {
            console.error("Error deleting test users:", error);
        } else {
            console.log("Test users deleted.");
        }
    });

    test("Test user registration at /register", async () => {
        const response = await request(app)
            .post(`${apiEndpoint}/auth/register`)
            .send({
                email: "testuser@example.com",
                username: "testuser",
                password: "TestPassword123!",
            });

        expect(response.statusCode).toBe(201);
    });

    test("Test successful user login /login", async () => {
        const response = await request(app)
            .post(`${apiEndpoint}/auth/login`)
            .send({
                email: testUser.email,
                password: testUser.password,
            });

        expect(response.statusCode).toBe(200);
    });

    test("Test unsuccessful duplicate user registration", async () => {
        const response = await request(app).post(`${apiEndpoint}/auth/register`).send({
            email: testUser.email,
            username: testUser.username,
            password: testUser.password,
        });

        expect(response.status).toBe(400);
    });

    test("Test failed login", async () => {
        const response = await request(app)
            .post(`${apiEndpoint}/auth/login`)
            .send({
                email: "notuser@mail.com",
                password: "n12312412",
            });

        expect(response.statusCode).toBe(400);
    });

});
