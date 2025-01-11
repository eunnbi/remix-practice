import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const seed = async () => {
  const kody = await db.user.create({
    data: {
      username: 'kody',
      // this is a hashed version of "twixrox"
      passwordHash:
        '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u',
    },
  });
  await Promise.all(
    getJokes().map((joke) => {
      const data = { jokesterId: kody.id, ...joke };
      return db.joke.create({ data });
    })
  );
};

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

function getJokes() {
  // shout-out to https://icanhazdadjoke.com/

  return [
    {
      name: 'Road worker',
      content: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
    },
    {
      name: 'Frisbee',
      content: `I was wondering why the frisbee was getting bigger, then it hit me.`,
    },
    {
      name: 'Trees',
      content: `Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady.`,
    },
    {
      name: 'Skeletons',
      content: `Why don't skeletons ride roller coasters? They don't have the stomach for it.`,
    },
    {
      name: 'Hippos',
      content: `Why don't you find hippopotamuses hiding in trees? They're really good at it.`,
    },
    {
      name: 'Dinner',
      content: `What did one plate say to the other plate? Dinner is on me!`,
    },
    {
      name: 'Elevator',
      content: `My first time using an elevator was an uplifting experience. The second time let me down.`,
    },
    {
      name: 'Cherry',
      content: `I'm tired of following my dreams. I'm just going to ask them where they are going and meet up with them later.`,
    },
    {
      name: 'David',
      content: `Did you hear about the guy whose whole left side was cut off? He's all right now.`,
    },
    {
      name: 'Carlson',
      content: `Why didn’t the skeleton cross the road? Because he had no guts.`,
    },
    {
      name: 'Woods',
      content: `What did one nut say as he chased another nut?  I'm a cashew!`,
    },
    {
      name: 'Holden',
      content: `Where do fish keep their money? In the riverbank`,
    },
    {
      name: 'Kelly',
      content: `I accidentally took my cats meds last night. Don’t ask meow.`,
    },
    {
      name: 'Bryan',
      content: `Chances are if you' ve seen one shopping center, you've seen a mall.`,
    },
    {
      name: 'Miller',
      content: `I knew I shouldn't steal a mixer from work, but it was a whisk I was willing to take.`,
    },
    {
      name: 'Davies',
      content: `I won an argument with a weather forecaster once. His logic was cloudy...`,
    },
    {
      name: 'Pollard',
      content: `How come the stadium got hot after the game? Because all of the fans left.`,
    },
    {
      name: 'Jensen',
      content: `"Why do seagulls fly over the ocean?" "Because if they flew over the bay, we'd call them bagels."`,
    },
    {
      name: 'Guerra',
      content: `Why was it called the dark ages? Because of all the knights.`,
    },
    {
      name: 'Humphrey',
      content: `A steak pun is a rare medium well done.`,
    },
    {
      name: 'Welch',
      content: `Why did the tomato blush? Because it saw the salad dressing.`,
    },
    {
      name: 'Wilkinson',
      content: `Did you hear the joke about the wandering nun? She was a roman catholic.`,
    },
  ];
}
