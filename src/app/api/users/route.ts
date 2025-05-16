import { createClient } from "@/lib/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const userID = searchParams.get('userID');
    if (!userID) {
        return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    const supabase = createClient();
    const { data, error } = await supabase
        .from("invitations")
        .select()
        .eq('id', userID)
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
}