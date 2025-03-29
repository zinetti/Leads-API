import { Handler } from "express";
import { prisma } from "../database";
import { group } from "console";
import { CreateGroupRequestSchema, UpdateGroupRequestSchema } from "./schemas/GroupsRequestSchema";
import { HttpError } from "../errors/HttpError";

export class GroupController {
    index: Handler = async(req, res, next) => {
        try {
            
            const groups = await prisma.group.findMany()
            res.json(groups)

        } catch (error) {
            next(error)
        }
    }

    create: Handler = async(req, res, next) => {
        try {
            const body = CreateGroupRequestSchema.parse(req.body)
            const newGroup = await prisma.group.create({ data: body })

            res.status(201).json(newGroup)
        } catch (error) {
            next(error)
        }
    }

    show: Handler = async(req, res, next) => {
        try {
            const group = await prisma.group.findUnique({
                where: { id: Number(req.params.id)},
                include: { leads: true}
            })

            if(!group) throw new HttpError(404, "groupo não encontrado")
            
            res.json(group)
        } catch (error) {
            next(error)
        }
    }

    update: Handler = async(req, res, next) => {
        try {
        const id = Number(req.params.id)
        const body  = UpdateGroupRequestSchema.parse(req.body)

        const groupsExists =  await prisma.group.findUnique({ where: { id }})
        if(!groupsExists) throw new HttpError(404, "Grupo não encontrado")

        const updatedGroup = await prisma.group.update({
            data: body, 
            where: { id }
        })

        res.json(updatedGroup)


        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async(req, res, next) => {
        try {
            const id  = Number(req.params.id)
            const groupsExists = await prisma.group.findUnique({ where: {id} })

            if(!groupsExists){
                throw new HttpError(404, "Grupo não encontrado")
            }


            const deletedGroup = await prisma.group.delete({ where: { id } })
            res.json({ deletedGroup})
        } catch (error) {
            next(error)
        }
    }
}