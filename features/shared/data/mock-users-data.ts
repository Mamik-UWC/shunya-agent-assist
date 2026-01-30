import { User, UserRole } from "@/types/auth";

export interface UserWithRelations extends User {
    managerName?: string;
    teamSize?: number;
    status: "active" | "inactive" | "pending";
}

export const mockUsers: UserWithRelations[] = [
    {
        id: "1",
        name: "John Doe",
        email: "john.doe@shunya.ai",
        role: "admin",
        status: "active",
        createdAt: "2024-01-10T10:00:00Z",
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane.smith@shunya.ai",
        role: "manager",
        status: "active",
        teamSize: 12,
        createdAt: "2024-01-12T09:30:00Z",
    },
    {
        id: "3",
        name: "Alice Wilson",
        email: "alice.wilson@shunya.ai",
        role: "agent",
        status: "active",
        managerName: "Jane Smith",
        createdAt: "2024-01-15T14:20:00Z",
    },
    {
        id: "4",
        name: "Bob Brown",
        email: "bob.brown@shunya.ai",
        role: "agent",
        status: "inactive",
        managerName: "Jane Smith",
        createdAt: "2024-01-18T11:10:00Z",
    },
    {
        id: "5",
        name: "Charlie Davis",
        email: "charlie.davis@shunya.ai",
        role: "manager",
        status: "active",
        teamSize: 8,
        createdAt: "2024-02-01T08:45:00Z",
    },
    {
        id: "6",
        name: "David Miller",
        email: "david.miller@shunya.ai",
        role: "agent",
        status: "pending",
        managerName: "Charlie Davis",
        createdAt: "2024-02-05T16:30:00Z",
    },
    {
        id: "7",
        name: "Eve Thompson",
        email: "eve.thompson@shunya.ai",
        role: "agent",
        status: "active",
        managerName: "Charlie Davis",
        createdAt: "2024-02-10T10:15:00Z",
    },
    {
        id: "8",
        name: "Frank Garcia",
        email: "frank.garcia@shunya.ai",
        role: "agent",
        status: "active",
        managerName: "Jane Smith",
        createdAt: "2024-02-12T13:40:00Z",
    },
    {
        id: "9",
        name: "Grace Lee",
        email: "grace.lee@shunya.ai",
        role: "manager",
        status: "active",
        teamSize: 5,
        createdAt: "2024-02-15T09:00:00Z",
    },
    {
        id: "10",
        name: "Henry Clark",
        email: "henry.clark@shunya.ai",
        role: "agent",
        status: "active",
        managerName: "Grace Lee",
        createdAt: "2024-02-18T15:20:00Z",
    },
    {
        id: "11",
        name: "Ivy Ross",
        email: "ivy.ross@shunya.ai",
        role: "agent",
        status: "active",
        managerName: "Grace Lee",
        createdAt: "2024-02-20T11:30:00Z",
    },
    {
        id: "12",
        name: "Jack White",
        email: "jack.white@shunya.ai",
        role: "agent",
        status: "inactive",
        managerName: "Grace Lee",
        createdAt: "2024-02-22T14:45:00Z",
    }
];
