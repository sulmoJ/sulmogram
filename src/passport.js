import "./env";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

// 해당 아이디와 비밀키를 입력받고 해석하여 토큰을 콜백함수로 리턴
const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id });
    if (user !== null) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (errer) {
    return done(error, false);
  }
};

// 인증용 미들웨어
export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { session: false }, (errer, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
