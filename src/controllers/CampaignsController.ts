import { Handler, response } from "express";
import { CreateCampaignsRequestSchema, UpdateCampaignsRequestSchema } from "./schemas/CampaingsRequestSchema";
import { prisma } from "../database";
import { HttpError } from "../errors/HttpError";
import { parse } from "path";

export class CampaignsController {
    index: Handler =  async (req, res, next) => {
        try {

            const campaigns = await prisma.campaign.findMany()
            res.json(campaigns)

        } catch (error) { 
            next(error)
        }
    }

    create: Handler =  async (req, res, next) => {
        try {

            const body = CreateCampaignsRequestSchema.parse(req.body)
            const newCampaign = await prisma.campaign.create({
                data:body
            })

            res.json(newCampaign)

        } catch (error) {
            next(error)
        }
    }

    show: Handler =  async (req, res, next) => {
        try {
            const campaing = await prisma.campaign.findUnique({
                where: { id: Number(req.params.id) },
                include: { 
                    Leads: { 
                        include:{
                            lead: true
                        }
                    }
                 }
            })

            if(!campaing) throw new HttpError(404, "Campanha não encontrado")
            
            res.json(campaing)
        } catch (error) {
            next(error)
        }
    }

    update: Handler =  async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const body = UpdateCampaignsRequestSchema.parse(req.body)

            const campaignExists = await prisma.campaign.findUnique({ where: { id }})
            if(!campaignExists) throw new HttpError(404, "Campanha não encontrada")

            const updatedCampaigns = await prisma.campaign.update({
                data: body,
                where: { id }
            })

            res.json(updatedCampaigns)
        } catch (error) {
            next(error)
        }
    }

    delete: Handler =  async (req, res, next) => {
        try {
            const id = Number(req.params.id)

            const campaignExists = await prisma.campaign.findUnique({ where: { id }})
            if(!campaignExists) throw new HttpError(404, "Campanha não encontrada")

            const deletedCampaign = await prisma.campaign.delete({ where: { id }})

        res.json({ deletedCampaign })
        } catch (error) {
            next(error)
        }
    }
}