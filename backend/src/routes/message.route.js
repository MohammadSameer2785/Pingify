import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllContacts,getMessagesByUserId,sendMessage } from "../controllers/message.controller.js";
import { arcjectProtection } from "../middleware/arcjet.middleware.js";
import { getChatPartners } from "../controllers/message.controller.js";
const router=express.Router();

// the middlewares execute in order - so requests get rate-limited first, then authenticated.
// this is actually more efficient since unauthenticated requests get blocked by rate limiting before hitting the auth middleware.
router.use(protectRoute)


router.get("/contacts",protectRoute,getAllContacts);
router.get("/chats",protectRoute,getChatPartners);
 router.get("/:id",protectRoute,getMessagesByUserId)
router.post("/send/:id",protectRoute,sendMessage);
export default router;