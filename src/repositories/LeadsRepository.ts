import { Lead } from "@prisma/client";

export type LeadStatus =   "New" | "Contacted"  | "Qualified" | "Converted" | "Unresponsive" | "Desqualified" | "Archived"

export interface LeadWhereParams{
    name?: {
        like?: String
        equals?: String
        mode?: "default" | "insensitive"
    }
    status?: LeadStatus
}

//Nossa própria interface
export interface FindLeadsParams {
    where?: LeadWhereParams
    sortBy?: "name" | "status" | "createdAt" 
    order?: "asc" | "desc"
    limit?: number
    offset?: number
}

export interface CreateLeadAttributes{
    name: string
    email: string
    phone: string
    status?: LeadStatus
}

//Nosso contrato, define o que os leads podem fazer
export interface LeadsRepository {
    //funcao async que devolve uma lista de leads
    find: (params: FindLeadsParams) => Promise<Lead[]>
    findById: (id: number) => Promise<Lead | null> 
    count: (where: LeadWhereParams) => Promise<number>
    create: (attributes: CreateLeadAttributes) => Promise<Lead>
    updateById: ( id: number, attributes: Partial<CreateLeadAttributes>) => Promise<Lead | null>
    deleteById: (id: number) => Promise<Lead | null>

}