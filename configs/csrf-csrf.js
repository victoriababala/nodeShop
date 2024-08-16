module.exports = {
  getSecret: () => "secret",
  cookieName: "__Host-psifi.x-csrf-token",
  cookieOptions: {
    sameSite: "None",
    path: "/",
    secure: true,
    signed: true,
  },
  getTokenFromRequest: (req) => {
    return req.body._csrf;
  },
};
