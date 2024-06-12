const express = require("express");
const request = require("supertest");
const router = require("../routes/messages");
const Message = require("../models/message");

// Mock the models
jest.mock("../models/message");

// Mock Express app
const app = express();
app.use(express.json());
app.use("/", router);

describe("Message Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /post", () => {
    it("should create a new message", async () => {
      const mockMessageData = { content: "Test message" };
      Message.create.mockResolvedValue({ id: 1, ...mockMessageData });
      const response = await request(app)
        .post("/post")
        .send(mockMessageData);
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({ id: 1, ...mockMessageData });
    });

    it("should handle errors when creating a new message", async () => {
      Message.create.mockRejectedValue(new Error("Database error"));
      const mockMessageData = { content: "Test message" };
      const response = await request(app)
        .post("/post")
        .send(mockMessageData);
      expect(response.statusCode).toBe(500); // Assuming a generic 500 error for simplicity
    });
  });

  describe("POST /get", () => {
    it("should retrieve messages", async () => {
      const mockRequestData = { provider_id: 1, patient_id: 1 };
      const mockMessages = [
        { id: 1, content: "Message 1" },
        { id: 2, content: "Message 2" },
      ];
      Message.getMessages.mockResolvedValue(mockMessages);
      const response = await request(app).post("/get").send(mockRequestData);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ messages: mockMessages });
    });

    it("should handle errors when retrieving messages", async () => {
      Message.getMessages.mockRejectedValue(new Error("Database error"));
      const mockRequestData = { provider_id: 1, patient_id: 1 };
      const response = await request(app).post("/get").send(mockRequestData);
      expect(response.statusCode).toBe(500); // Assuming a generic 500 error for simplicity
    });
  });
});
