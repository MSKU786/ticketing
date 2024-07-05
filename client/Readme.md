This is a reminder about any "Invalid <Link> with <a>" errors that you will encounter in the upcoming lectures. Similar to previous Next 13 guidance, you will need to remove the nested a tags from the Link components.

eg:

<Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
  View
</Link>
