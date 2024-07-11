import cors from '@fastify/cors';
import fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { confirmParticipants } from './routes/confirm-participant';
import { confirmTrip } from './routes/confirm-trip';
import { createActivity } from './routes/create-activity';
import { createInvite } from './routes/create-invite';
import { createLink } from './routes/create-link';
import { createTrip } from './routes/create-trip';
import { getLinks } from './routes/get-links';
import { getParticipant } from './routes/get-participant';
import { getParticipants } from './routes/get-participants';
import { getTripDetails } from './routes/get-trip-details';
import { getActivities } from './routes/get_activities';
import { updateTrip } from './routes/update-trip';
import { env } from './env';

const app = fastify();

app.register(cors, {
    origin: env.WEB_BASE_URL
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createTrip);
app.register(updateTrip);
app.register(confirmTrip);
app.register(getTripDetails);
app.register(confirmParticipants);
app.register(createActivity);
app.register(getActivities);
app.register(createLink);
app.register(getLinks);
app.register(getParticipants);
app.register(getParticipant);
app.register(createInvite);

app.listen({port: env.PORT}).then(() => {
    console.log("Server running!");
})