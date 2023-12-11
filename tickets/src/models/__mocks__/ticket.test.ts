import { Ticket } from '../ticket';

it('implemetns optimistic currency control', async () => {
  //Create am omstamce of ticket

  const ticket = Ticket.build({
    title: 'concert',
    price: 5,
    userId: '123',
  });

  //Save the ticket to db
  await ticket.save();

  //Fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  //Two seprate changes to the instance we fetched
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 20 });

  //save the first fetched ticket
  await firstInstance!.save();

  //save the second ticket and expect an error
  try {
    await secondInstance!.save();
  } catch (err) {
    return;
  }

  throw new Error('should not reach here');
});
