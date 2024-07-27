import { Router } from "express";
import { verifyToken } from "../middleswares/AuthMiddlesware.js";
import { getContactsForDMList, searchContacts } from "../controllers/ContactsController.js";

const contactsRoutes=Router();
contactsRoutes.post("/search", verifyToken,searchContacts);
contactsRoutes.get("/get-contacts-for-dm",verifyToken,getContactsForDMList);
export default contactsRoutes;