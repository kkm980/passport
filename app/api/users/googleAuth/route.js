import passport from "passport";
import { connectPassport } from "../../../../utils/Provider"
export default async function GET(req, res, next) {
  connectPassport();

  passport.authenticate("google", {
    scope: ["profile"],
  })

}