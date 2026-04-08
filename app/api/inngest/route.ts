import { serve } from 'inngest/next'
import { verificationEvent } from '@/features/auth/events/event-verification'
import { passwordRestEvent } from '@/features/password/events/event-password-reset'
import { inngest } from '@/lib/inngest'


export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [passwordRestEvent, verificationEvent]
})