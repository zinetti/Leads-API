import { Handler } from "express";

import { number } from "zod";
import { Prisma } from "@prisma/client";
import { addLeadRequestSchema, GetCampaignLeadsRequestSchema, updateLeadStatusRequestSchema } from "./schemas/CampaingsRequestSchema";
import { prisma } from "../database";

export class CampaignLeadsController {
    getLeads: Handler = async (req, res, next) => {
        try {
            const campaignId = Number(req.params.campaignId)
            const query = GetCampaignLeadsRequestSchema.parse(req.query)
            const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query

            const pageNumber = Number(page)
            const pageSizeNumber = Number(pageSize)

            const where: Prisma.LeadWhereInput = { 
                Campaigns: {
                    some:{ campaignId }
                }
            }

            if(name) where.name = { contains: name, mode: "insensitive"}
            if(status) where.Campaigns = { some: { status }}

            const leads = await prisma.lead.findMany({
                where,
                orderBy: {[sortBy]: order},
                skip: (pageNumber - 1) * pageSizeNumber,
                take: pageSizeNumber,
                include:{
                    Campaigns: { 
                        select: {
                            campaignId: true,
                            leadId: true,
                            status: true
                        }
                    }
                }
            })

            const total = await prisma.lead.count({ where })

            res.json({
                leads,
                meta: {
                    page: pageNumber,
                    pageSize: pageSizeNumber,
                    total,
                    totalPages:Math.ceil(total / pageSizeNumber)
                }
            })
        } catch (error) {
            next(error)
        }
    }

    addLead: Handler = async (req, res, next) => {
        try {

            const body = addLeadRequestSchema.parse(req.body)
            await prisma.leadCampaign.create({
                data: {
                    campaignId: Number(req.params.campaignId),
                    leadId: body.leadId,
                    status: body.status
                }
            })

            res.status(201).end()
            
        } catch (error) {
            next(error)
        }
    }

    updateLeadStatus: Handler = async (req, res, next) => {
        try {
            const body = updateLeadStatusRequestSchema.parse(req.body)

            const updatedLeadCampaign = await prisma.leadCampaign.update({
                data: body,
                where: {
                    leadId_campaignId: {
                        campaignId: Number(req.params.campaignId),
                        leadId: Number(req.params.leadId)
                    }
                }
            })

            res.json(updatedLeadCampaign)
            
        } catch (error) {
            next(error)
        }
    }

    removeLead: Handler = async (req, res, next) => {
        try {
            const removedLead = await prisma.leadCampaign.delete({
                where: {
                    leadId_campaignId: {
                        campaignId: Number(req.params.campaignId),
                        leadId: Number(req.params.leadId)
                    }
                }
            })

            res.json({removedLead})
        } catch (error) {
            next(error)
        }
    }
}