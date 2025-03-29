import { Router } from "express";
import { HttpError } from "./errors/HttpError";
import { LeadsController } from "./controllers/LeadsController";
import { GroupController } from "./controllers/GroupController";
import { CampaignsController } from "./controllers/CampaignsController";
import { CampaignLeadsController } from "./controllers/CampaignLeadsController";
import { GroupLeadsController } from "./controllers/GroupLeadsController";


const router = Router()

//Importa o controller
const leadsController = new LeadsController()
const groupController = new GroupController()
const campaignsController = new CampaignsController()
const campaignLeadsController = new CampaignLeadsController()
const groupLeadsController = new GroupLeadsController()

router.get("/leads", leadsController.index)
router.post("/leads", leadsController.create)
router.get("/leads/:id", leadsController.show)
router.put("/leads/:id", leadsController.update)
router.delete("/leads/:id", leadsController.delete)

router.get("/groups", groupController.index)
router.post("/groups", groupController.create)
router.get("/groups/:id", groupController.show)
router.delete("/groups/:id", groupController.delete)
router.put("/groups", groupController.update)

router.get("/groups/:groupId/leads",groupLeadsController.getLeads)
router.post("/groups/:groupId/leads", groupLeadsController.addLead)
router.delete("/groups/:groupId/leads/:leadId", groupLeadsController.removeLead)

router.get("/campaigns", campaignsController.index)
router.post("/campaigns", campaignsController.create)
router.get("/campaigns/:id", campaignsController.show)
router.put("/campaigns", campaignsController.update)
router.delete("/campaigns/:id", campaignsController.delete)

router.get("/campaigns/:campaignId/leads", campaignLeadsController.getLeads)
router.post("/campaigns/:campaignId/leads", campaignLeadsController.addLead)
router.put("/campaigns/:campaignId/leads/:leadId", campaignLeadsController.updateLeadStatus)
router.delete("/campaigns/:campaignId/leads/:leadId", campaignLeadsController.removeLead)








router.get("/teste", async (req, res, next) => {

    try {
        throw new HttpError(401, "Nao autorizado")
        res.json({message: "Ok"})
        
    } catch (error) {
        next(error)
    }
})

export { router }