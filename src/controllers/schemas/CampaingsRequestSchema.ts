import { z } from "zod"

export const CreateCampaignsRequestSchema = z.object({
    name: z.string(),
    description: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional()
})

export const UpdateCampaignsRequestSchema = z.object({
    name: z.string(). optional(),
    description: z.string().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional()
})

const LeadCampaignStatusSchema = z.enum([
    "New",
    "Contacted",
    "Qualified",
    "Converted",
    "Unresponsive",
    "Disqualified",
    "Archived"
])

export const GetCampaignLeadsRequestSchema = z.object({
      page: z.string().optional(),
      pageSize: z.string().optional(),
      name: z.string().optional(),
      status: LeadCampaignStatusSchema.optional(),
      sortBy:  z.enum(["name", "createdAt"]).optional(),
      order: z.enum(["asc", "desc"]).optional()
})

export const addLeadRequestSchema = z.object({
    leadId: z.number(),
    status: LeadCampaignStatusSchema.optional()
})

export const updateLeadStatusRequestSchema = z.object({
    status: LeadCampaignStatusSchema
})