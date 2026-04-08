import { EventSchemas, Inngest } from 'inngest'
import { verificationEventArgs } from '@/features/auth/events/event-verification'
import { PasswordRestEventArgs } from '@/features/password/events/event-password-reset'

type Events = {
    'app/password.password-rest': PasswordRestEventArgs,
    'app/auth.verification': verificationEventArgs
}

export const inngest = new Inngest({
    id: 'the-road-to-next',
    schemas: new EventSchemas().fromRecord<Events>(),
})