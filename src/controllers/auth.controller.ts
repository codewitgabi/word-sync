import authService from "../services/auth.service";
import catchAsync from "../utils/catch-async";

export const registerUser = catchAsync(async (req, res) => {
  const response = await authService.registerUser(req.body);
  return res.status(response.httpStatus).json(response);
});

export const login = catchAsync(async (req, res) => {
  const response = await authService.login(req.body);
  return res.status(response.httpStatus).json(response);
});
