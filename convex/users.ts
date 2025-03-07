import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    username: v.string(),
    fullname: v.string(),
    image: v.string(),
    bio: v.optional(v.string()),
    email: v.string(),
    clerkId: v.string(),
  },

  // first param (theContext) allows us to interact with db
  // second param (args) ref the above values username... clerkId
  handler: async (theContext, args) => {
    const existingUser = await theContext.db
      .query("users")
      .withIndex("by_clerk_id", (theQuery) =>
        theQuery.eq("clerkId", args.clerkId)
      )
      .first();

    if (existingUser) return;

    // create user in db
    await theContext.db.insert("users", {
      username: args.username,
      fullname: args.fullname,
      email: args.email,
      bio: args.bio,
      image: args.image,
      clerkId: args.clerkId,
      followers: 0,
      following: 0,
      posts: 0,
    });
  },
});
