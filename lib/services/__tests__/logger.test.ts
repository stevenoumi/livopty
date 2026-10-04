import { logger } from "../logger";

// Mock console methods
const originalConsoleLog = console.log;
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

describe("Logger", () => {
  beforeEach(() => {
    console.log = jest.fn();
    console.warn = jest.fn();
    console.error = jest.fn();
  });

  afterEach(() => {
    console.log = originalConsoleLog;
    console.warn = originalConsoleWarn;
    console.error = originalConsoleError;
  });

  describe("info", () => {
    it("should log info message in development", () => {
      logger.info("Test info message");
      expect(console.log).toHaveBeenCalled();
    });

    it("should log info with data", () => {
      const data = { userId: "123" };
      logger.info("User action", data);
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining("User action"),
        data,
      );
    });
  });

  describe("warn", () => {
    it("should log warning message", () => {
      logger.warn("Test warning");
      expect(console.warn).toHaveBeenCalled();
    });
  });

  describe("error", () => {
    it("should log error message", () => {
      const error = new Error("Test error");
      logger.error("Error occurred", error);
      expect(console.error).toHaveBeenCalled();
    });

    it("should handle error without data", () => {
      logger.error("Simple error");
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("debug", () => {
    it("should log debug message in development", () => {
      logger.debug("Debug info");
      expect(console.log).toHaveBeenCalled();
    });
  });
});
