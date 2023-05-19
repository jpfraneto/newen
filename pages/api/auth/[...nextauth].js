import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import TwitterProvider from 'next-auth/providers/twitter';
import GoogleProvider from 'next-auth/providers/google';
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
