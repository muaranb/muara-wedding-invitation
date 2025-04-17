import { createClient } from '@/lib/supabase/client';
import { Invitation } from '../../types/index/invitation';

export async function getUser(userID: string) : Promise<Invitation | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("invitations")
        .select()
        .eq('id', userID)
        .single();

    if (error) {
        console.error("Error fetching invitation:", error);
        return null;
    }

    return data;
}
