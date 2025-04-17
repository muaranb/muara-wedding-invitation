import { UUID } from "crypto";

export interface Invitation {
    id: UUID;
    honorific?: string;
    name?: string;
    created_at: Date;
} 