import { HtmlError } from ".";
import { User, VerifiedUser } from "../firebase";

export function verifyUser(user: User): VerifiedUser {
  if (!user.uid || !user.name) {
    throw new HtmlError(412, "User data is invalid");
  }
  return { ...user, uid: user.uid, name: user.name };
}
