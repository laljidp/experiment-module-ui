import { generateRandomName, generateUUID } from "./utils";

describe("Test utils functions", () => {
  test("generateRandomName function", () => {
    expect(generateRandomName(1).length).toBeGreaterThan(2);
    expect(generateRandomName(2).length).toBeGreaterThan(5);
    expect(generateRandomName(3).length).toBeGreaterThan(10);
  });

  test("generateUUID function", () => {
    expect(generateUUID().length).toBe(36); // standard v4 uuid length = 36
    expect(generateUUID().length).toBe(36);
  });
});
