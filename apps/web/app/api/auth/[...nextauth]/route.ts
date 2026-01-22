import NextAuth, { Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { CreateUserBody } from "@bookinvideo/contracts";
import { API_URL } from "@/config/nest-api-url";

type OverriddenProfile = Profile & {
  email_verified: boolean;
};

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ profile, user }) {
      try {
        if (
          !(profile as OverriddenProfile)?.email_verified ||
          !user.email ||
          !user.name ||
          !user.id
        ) {
          return false;
        }

        const payload: CreateUserBody = {
          email: user.email,
          name: user.name,
          provider: "google",
          providerUserId: user.id,
          avatarUrl: user.image,
        };

        const res = await fetch(API_URL + "/user/ensure-from-oauth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          return false;
        }

        return true;
      } catch (err) {
        console.log(err);

        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
