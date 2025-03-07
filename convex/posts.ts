import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation(async (theContext) => {
  const identity = await theContext.auth.getUserIdentity();
  if (!identity) throw new Error("Unauthorized");
  return await theContext.storage.generateUploadUrl();
});

export const createPost = mutation({
  args: {
    caption: v.optional(v.string()),
    storageId: v.id("_storage"),
  },

  handler: async (theContext, args) => {
    const identity = await theContext.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const currentUser = await theContext.db
      .query("users")
      .withIndex("by_clerk_id", (theQuery) =>
        theQuery.eq("clerkId", identity.subject)
      )
      .first();
    //   typescript specific fix, using this condition allows the ts compiler to know if the value in currentUser, and imageUrl, are null or not
    if (!currentUser) throw new Error("User not found");

    const imageUrl = await theContext.storage.getUrl(args.storageId);
    if (!imageUrl) throw new Error("Image not found");

    // create post
    const postId = await theContext.db.insert("posts", {
      userId: currentUser._id,
      imageUrl,
      storageId: args.storageId,
      caption: args.caption,
      likes: 0,
      comments: 0,
    });

    // increment user's post by 1
    await theContext.db.patch(currentUser._id, {
      posts: currentUser.posts + 1,
    });

    return postId;
  },
});
