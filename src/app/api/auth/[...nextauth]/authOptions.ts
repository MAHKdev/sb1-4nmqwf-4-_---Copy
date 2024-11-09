import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { isDemoUser } from '@/lib/demoAuth';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Demo Account',
      credentials: {
        id: { type: 'text' },
        name: { type: 'text' },
        email: { type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.id || !isDemoUser(credentials.id)) {
          return null;
        }

        return {
          id: credentials.id,
          name: credentials.name,
          email: credentials.email,
          image: `https://ui-avatars.com/api/?name=${encodeURIComponent(credentials.name || 'Demo User')}`,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development',
};