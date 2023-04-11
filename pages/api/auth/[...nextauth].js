import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import TwitterProvider from 'next-auth/providers/twitter';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from 'lib/prisma';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CONSUMER_KEY,
      clientSecret: process.env.TWITTER_CONSUMER_SECRET,
    }),
  ],
  // pages: {
  //   signIn: '/auth/signin',
  // },

  database: process.env.DATABASE_URL,
  secret: process.env.SECRET,

  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('inside the signIn callback: ', profile);
      console.log('the user is: ', user);
      console.log('the account is: ', account);
      console.log('the credentials are: ', credentials);

      // Find the user by providerAccountId or email
      const existingUser = await prisma.user.findUnique({
        where: {
          providerAccountId: account.providerAccountId,
        },
      });

      if (existingUser) {
        // Update the user with the Twitter username
        await prisma.user.update({
          where: {
            id: existingUser.id,
          },
          data: {
            username: profile.screen_name,
          },
        });

        return true;
      } else {
        // If the user does not exist, return false to stop the sign-in process
        return false;
      }
    },
    session({ session, user }) {
      console.log('inside the session', session, 'the user', user);
      session.user.id = user.id;
      return session;
    },
  },
});
