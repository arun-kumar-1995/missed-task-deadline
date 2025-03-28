export const SendToken = (res, token, message) => {
  return res
    .status(200)
    .cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
      sameSite: 'strict',
    })
    .json({
      success: true,
      message,
      token,
    })
}
