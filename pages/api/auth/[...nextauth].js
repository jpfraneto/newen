import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import TwitterProvider from 'next-auth/providers/twitter';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@component/lib/prismaClient';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CONSUMER_KEY,
      clientSecret: process.env.TWITTER_CONSUMER_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },

  database: process.env.DATABASE_URL,
  secret: process.env.SECRET,

  // session: {
  //   jwt: true,
  //   maxAge: 30 * 24 * 60 * 60, // 30 days
  // },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      switch (account.provider) {
        case 'twitter':
          if (user.id) {
            try {
              if (user.username && user.oauthProvider) return true;
              const users = await prisma.user.findMany();

              if (user.id === profile.id_str) {
                return true;
              }

              await prisma.user.update({
                where: {
                  id: user.id,
                },
                data: {
                  username: profile.screen_name,
                  providerAccountId: profile.id.toString(),
                  oauthProvider: account.provider,
                },
              });

              return true;
            } catch (error) {
              console.log('THERE WAS AN ERROR IN THE SIGN IN FUNCTION:', error);
            }
          } else {
            // If the user does not exist, return false to stop the sign-in process
            return true;
          }
          break;
      }
      return true;
    },

    async session({ session, token, user }) {
      session.user.id = user.id;
      session.user.oauthProvider = user.oauthProvider;
      session.user.whatsapp = user.whatsapp;
      session.user.points = user.points;
      session.user.level = user.level;
      if (user.username) {
        session.user.username = user.username;
      }

      if (!user.timeZone) {
        // Get the user's timezone from the browser
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        // Update the user in the database with the timezone
        await prisma.user.update({
          where: { id: user.id },
          data: { timeZone: timeZone },
        });
        // Update the session object with the user's timezone
        session.user.timeZone = timeZone;
      } else {
        session.user.timeZone = user.timeZone;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
