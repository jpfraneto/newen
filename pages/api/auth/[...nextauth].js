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
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
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
      switch (account.provider) {
        case 'twitter':
          if (user.id) {
            try {
              if (user.username && user.oauthProvider) return true;
              const users = await prisma.user.findMany();
              console.log('the users in the database are:', users);
              console.log('the user os', user, 'the profile is:', profile);
              if (user.id === profile.id_str) {
                console.log(
                  'THIS MEANS THAT THIS IS THE FIRST LOGIN FROM THIS USER. I NEED TO ADD SOME FEATURE HERE TO RECORD THE username, providerAccountId and oauthProvider in the user in the database. But how can I do that if I dont have access to a callback?'
                );
                return true;
              }
              console.log('MORE THAN FIRST LOGIN FROM THIS USER.');

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
            console.log('here, the user didnt exist but this is true');
            return true;
          }
          break;
        // case 'google':
        //   try {
        //     if (user.providerAccountId && user.oauthProvider) return true;
        //     await prisma.user.update({
        //       where: {
        //         email: user.email,
        //       },
        //       data: {
        //         providerAccountId: account.providerAccountId,
        //         oauthProvider: profile.provider,
        //       },
        //     });
        //     return true;
        //   } catch (error) {
        //     console.log(
        //       'THERE WAS AN ERROR IN THE SIGN IN GOOGLE FUNCTION:',
        //       error
        //     );
        //   }
      }
      return true;
    },
    session({ session, token, user }) {
      console.log('INSIDE THE SESSION THING', session, 'user', user);
      session.user.id = user.id;
      session.user.oauthProvider = user.oauthProvider;
      if (user.username) {
        session.user.username = user.username;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
