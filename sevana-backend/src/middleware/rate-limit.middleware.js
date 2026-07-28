const { fail } = require("../shared/response");

function createRateLimiter({ windowMs, max, message }) {
  const requests = new Map();

  return (req, res, next) => {
    const now = Date.now();
    const key = req.ip;
    const entry = requests.get(key);

    if (!entry || entry.resetAt <= now) {
      requests.set(key, { count: 1, resetAt: now + windowMs });
      res.set("RateLimit-Limit", String(max));
      res.set("RateLimit-Remaining", String(max - 1));
      return next();
    }

    entry.count += 1;
    const remaining = Math.max(0, max - entry.count);
    res.set("RateLimit-Limit", String(max));
    res.set("RateLimit-Remaining", String(remaining));
    res.set("RateLimit-Reset", String(Math.ceil(entry.resetAt / 1000)));

    if (entry.count > max) {
      res.set("Retry-After", String(Math.ceil((entry.resetAt - now) / 1000)));
      return fail(res, { statusCode: 429, message });
    }

    return next();
  };
}

const apiRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: "Too many requests. Please try again later.",
});

const authRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many authentication attempts. Please try again later.",
});

module.exports = { apiRateLimiter, authRateLimiter };
