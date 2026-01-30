import React from 'react';
import { UserListTable } from '@/features/shared/components/user-list-table';
import { ConfigHeader } from '@/components/layout/ConfigHeader';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

const UsersPage = () => {
    return (
        <div className="space-y-6 p-6">
            <ConfigHeader
                title="User Management"
                description="Manage all users, agents, and managers in the system."
                actions={
                    <Button
                        variant="default"

                    >
                        <Mail className="h-4 w-4" />
                        Invite User
                    </Button>
                }
            />
            <UserListTable />
        </div>
    )
}

export default UsersPage;