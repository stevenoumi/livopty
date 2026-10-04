import {
  requestPasswordReset,
  updatePassword,
  verifyRecoveryCode,
} from "../authService";
import { supabase } from "../supabase";

jest.mock("../supabase", () => ({
  supabase: {
    auth: {
      resetPasswordForEmail: jest.fn(),
      verifyOtp: jest.fn(),
      updateUser: jest.fn(),
    },
  },
}));

jest.mock("../../logger", () => ({
  logger: { error: jest.fn(), info: jest.fn(), debug: jest.fn() },
}));

const auth = supabase.auth as unknown as Record<string, jest.Mock>;

describe("requestPasswordReset", () => {
  beforeEach(() => jest.clearAllMocks());

  it("normalizes the email before calling Supabase", async () => {
    auth.resetPasswordForEmail.mockResolvedValue({ error: null });

    await requestPasswordReset("  Jane@Example.COM ");

    expect(auth.resetPasswordForEmail).toHaveBeenCalledWith("jane@example.com");
  });

  it("answers the same way whether or not the account exists", async () => {
    auth.resetPasswordForEmail.mockResolvedValue({
      error: { status: 400, message: "User not found" },
    });

    await expect(requestPasswordReset("nobody@example.com")).resolves.toEqual({
      success: true,
    });
  });

  it("surfaces rate limiting so the user knows to wait", async () => {
    auth.resetPasswordForEmail.mockResolvedValue({
      error: { status: 429, message: "Too many requests" },
    });

    await expect(requestPasswordReset("jane@example.com")).resolves.toEqual({
      success: false,
      error: "Too many requests",
    });
  });
});

describe("verifyRecoveryCode", () => {
  beforeEach(() => jest.clearAllMocks());

  it("verifies the code as a recovery token", async () => {
    auth.verifyOtp.mockResolvedValue({ error: null });

    const result = await verifyRecoveryCode("jane@example.com", "123456");

    expect(auth.verifyOtp).toHaveBeenCalledWith({
      email: "jane@example.com",
      token: "123456",
      type: "recovery",
    });
    expect(result.success).toBe(true);
  });

  it("returns a readable error for a wrong or expired code", async () => {
    auth.verifyOtp.mockResolvedValue({ error: { code: "otp_expired" } });

    const result = await verifyRecoveryCode("jane@example.com", "000000");

    expect(result).toEqual({
      success: false,
      error: "Code invalide ou expiré",
    });
  });
});

describe("updatePassword", () => {
  beforeEach(() => jest.clearAllMocks());

  it("explains when the new password equals the old one", async () => {
    auth.updateUser.mockResolvedValue({
      error: { code: "same_password", message: "same" },
    });

    const result = await updatePassword("password123");

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/différent/);
  });
});
