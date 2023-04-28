import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export interface TokenPayload extends JwtPayload {
  id: number;
  username: string;
  email: string;
  profile?: string;
}

export class AuthUtil {
  static tokenList = {};

  static async generatePassword(_password: string) {
    const salt = await bcrypt.genSalt(10);

    const password = await bcrypt.hash(_password, salt);

    return password;
  }

  static async isEqualPassword(_password: string, hashedPassword: string) {
    const isEqualPassword = await bcrypt.compare(_password, hashedPassword);

    return isEqualPassword;
  }

  static generateAccessToken({ id, username, email, profile }: TokenPayload) {
    return jwt.sign(
      { id, username, email, ...(profile && { profile }) },
      process.env.JWT_ACCESSTOKEN_SECRET,
      {
        expiresIn: process.env.JWT_ACCESSTOKEN_EXPIRE,
      }
    );
  }

  static generateRefreshToken({ id, username, email }: TokenPayload) {
    return jwt.sign(
      { id: id, username: username, email: email },
      process.env.JWT_REFRESHTOKEN_SECRET,
      {
        expiresIn: process.env.JWT_REFRESHTOKEN_EXPIRE,
      }
    );
  }

  static registerToken(refreshToken: string, accessToken: string) {
    this.tokenList[refreshToken] = {
      status: "loggedin",
      accessToken,
      refreshToken,
    };
  }

  static decode(token: string) {
    return jwt.decode(token);
  }

  static verify(
    token: string,
    secret: string,
    callback?: jwt.VerifyCallback<TokenPayload>
  ) {
    if (callback) {
      return jwt.verify(token, secret, callback);
    }

    return jwt.verify(token, secret);
  }

  static removeToken(refreshToken: string) {
    delete this.tokenList[refreshToken];
  }
}
