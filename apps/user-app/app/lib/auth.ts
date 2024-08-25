import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? ""
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""    
        }),
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            name: { label: "Name", type: "text" },
            phone: { label: "Phone number", type: "text", required: true },
            password: { label: "Password", type: "password", required: true }
          },
          // TODO: User credentials type from next-aut
          async authorize(credentials: any) {
            // Do zod validation, OTP validation here
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await db.user.findFirst({
                where: {
                    number: credentials.phone
                }
            });

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.number
                    }
                }
                return null;
            }

            try {
                const user = await db.user.create({
                    data: {
                        name:credentials.name,
                        number: credentials.phone,
                        password: hashedPassword
                    }
                })
                
                const balance=await db.balance.create({
                    data:{
                        amount:0,
                        userId:user.id,
                        locked:0 
                    }
                })
            
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.number,
                    
                }
            } catch(e) {
                console.error(e);
            }

            return null
          },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",

    pages: {
        signIn: "/signup",
    },

      callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async signIn({ user, account, profile }:any) {
          
            if (account.provider === "github" || account.provider === "google") {
              let existingUser = await db.user.findFirst({
                where: { email: user.email }
              });
      
            }
           
            return true;
          },
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }

    }
   
  }
  