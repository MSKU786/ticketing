This is a reminder about any "Invalid <Link> with <a>" errors that you will encounter in the upcoming lectures. Similar to previous Next 13 guidance, you will need to remove the nested a tags from the Link components.

eg:

<Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
  View
</Link>

Module not found: Can't resolve 'prop-types'
In the upcoming lecture, you will get an error thrown by react-stripe-checkout when to trying to load the application:

[client] - error ./node_modules/react-stripe-checkout/dist/main.js:15:0

[client] Module not found: Can't resolve 'prop-types'

To resolve this, we will need to install an additional dependency to our client service:

npm install prop-types

After this change, re-run skaffold dev to rebuild the cluster.
