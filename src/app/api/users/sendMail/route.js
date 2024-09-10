import { NextResponse } from 'next/server';
import { sendmail } from '@/helper/mailer';

export async function POST(request) {
  try {
    const { email, emailType, userId } = await request.json();

    // Validate the request body
    if (!email || !emailType || !userId) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    await sendmail({ email, emailType, userId });

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
