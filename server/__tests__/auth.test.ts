import { app } from "../app";
import request from "supertest";
import dotenv from "dotenv";
import supabase from "../config/supabase";
import {response} from "express";
import { describe, expect, test, beforeEach, afterAll } from '@jest/globals';
import bcrypt from "bcryptjs";

dotenv.config({ path: ".env.test" });

const apiEndpoint = "/api/v1";

describe("Tests for endpoints at /auth", () => {

    const testUser = {
        email: "test123@test.com",
        username: "test123",
        password: "test123123",
    }

    beforeEach(async () => {
        const hashedPassword = await bcrypt.hash(testUser.password, 10)

        await supabase.from("users").insert([
            { email: testUser.email,
                username: testUser.username,
                password_hash: hashedPassword }
        ]);
    });

    afterAll(async () => {
        await supabase.from("users").delete().gt("created_at", "1900-01-01");
        app.listen().close();
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

        console.log(response.body);
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
                email: "not user",
                password: "n12312412",
            });

        expect(response.statusCode).toBe(400);
    })

})