import { EventSchemas, Inngest } from 'inngest'
import { PasswordRestEventArgs } from '@/features/password/events/event-password-reset'

type Events = {
    'app/password.password-rest': PasswordRestEventArgs
}

export const inngest = new Inngest({
    id: 'the-road-to-next',
    schemas: new EventSchemas().fromRecord<Events>(),
})