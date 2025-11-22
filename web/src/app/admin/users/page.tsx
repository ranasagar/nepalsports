import React from 'react';
import { createClient } from '@/utils/supabase/server';
import UsersTable from '@/components/admin/UsersTable';

export default async function UsersPage() {
    const supabase = await createClient();

    const { data: users } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

    return <UsersTable users={users || []} />;
}
