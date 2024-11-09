import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/authOptions';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { data, error } = await supabase
      .from('user_data')
      .select('*')
      .eq('user_id', session.user.id)
      .single();

    if (error) throw error;

    return NextResponse.json(data?.content || {});
  } catch (error) {
    console.error('Sync GET error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const content = await request.json();

    const { error } = await supabase
      .from('user_data')
      .upsert({
        user_id: session.user.id,
        content,
        updated_at: new Date().toISOString(),
      });

    if (error) throw error;

    return new NextResponse('OK');
  } catch (error) {
    console.error('Sync POST error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}