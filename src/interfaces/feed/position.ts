export interface Position {
    id: number;
    tenantId: string;
    name: string;
    departament: string | null;
    description: string | null;
    dueDate: Date | null;
    active: boolean;
    status: string | null;
    createdAt: Date;
    createdBy: string;
}