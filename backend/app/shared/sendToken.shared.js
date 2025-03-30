export const SendToken = (res, data, message) => {
  return res
    .status(200)
    .cookie('token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
      sameSite: 'strict',
    })
    .json({
      success: true,
      message,
      isAuthenticated: true,
      userId: data.userId,
      token: data.token,
    })
}
