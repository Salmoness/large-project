import { verifyAndRefreshJWT } from "../utils/jwtService.js";
import { UNAUTHORIZED, SUCCESS } from "../utils/responseCodeConstants.js";

export async function verifyLogin(req, res) {
    try {
        const { jwt } = req.body;
        const [jwtPayload, jwtRefreshStr, jwtVerified] = verifyAndRefreshJWT(jwt);
        if (!jwtVerified)
            return res.status(UNAUTHORIZED).json({ error: "JWT invalid or expired" });
        else 
            return res.status(SUCCESS).json({error: "", username: jwtPayload.username})

    } catch (err) {
        console.error("Login verification failed:", err);
        return res.status(500).json({ error: "Internal server error." });
    }
};
