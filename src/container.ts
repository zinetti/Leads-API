import { LeadsController } from "./controllers/LeadsController";
import { GroupController } from "./controllers/GroupController";
import { CampaignsController } from "./controllers/CampaignsController";
import { CampaignLeadsController } from "./controllers/CampaignLeadsController";
import { GroupLeadsController } from "./controllers/GroupLeadsController";
import { PrismaLeadsRepository } from "./repositories/prisma/PrismaLeadsRepository";




const leadsRepository = new PrismaLeadsRepository()

//Importa o controller
export const leadsController = new LeadsController( leadsRepository)
export const groupController = new GroupController()
export const campaignsController = new CampaignsController()
export const campaignLeadsController = new CampaignLeadsController()
export const groupLeadsController = new GroupLeadsController()

