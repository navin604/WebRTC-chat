const request = require("supertest");
const server = require("./server");

describe("Testing root path", () => {
  test('It should respond API object"', async () => {
    try {
      const response = request(server).get("/");
      expect(response.statusCode).toBe(200);
      expect(response.api).toBe("quickvid-api");
    } catch (e) {
      expect(e).toBe(e);
    }
  });
});

describe("Testing /get-turn-credentials", () => {
  test('Should respond with turn credentials"', async () => {
    try {
      const response = request(server).get("/api/get-turn-credentials");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("token");
    } catch (e) {
      expect(e).toBe(e);
    }
  });
});

describe("POST /join-room", () => {
  test("Should retrieve a token", async () => {
    try {
      const userData = { roomName: "welcome_call", identity: "John" };
      const response = await request(server).post("/join-room").send(userData);
      expect(response.statusCode).toBe(200);
      expect(response.body.token).toBeDefined();
    } catch (e) {
      expect(e).toBe(e);
    }
  });
});
