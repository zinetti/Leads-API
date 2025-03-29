import { LeadStatus } from "@prisma/client";
import { z } from "zod";
//Cria validações para a requisição

const LeadStatusSchema = z.enum([
  "New",
    "Contacted",
    "Qualified",
    "Converted",
    "Unresponsive",
    "Disqualified",
    "Archived"
])

export const GetLeadsRequestSchema = z.object({
  page: z.string().optional(),
  pageSize: z.string().optional(),
  name: z.string().optional(),
  status: LeadStatusSchema.optional(),
  sortBy:  z.enum(["name", "status", "createdAt"]).optional(),
  order: z.enum(["asc", "desc"]).optional()
})

//Valida se ao criar um Lead a requisicao vem com a tipagem correta,
export const CreateLeadRequestSchema = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    status: LeadStatusSchema.optional()
})

export const UpdateLeadRequestSchema =  z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    status: LeadStatusSchema.optional()
  })