/**
 * A set of functions called "actions" for `touch`
 */

export default {
  async updateTimestamp(ctx) {
    try {
      const { collection, id } = ctx.request.body;

      if (!collection || !id) {
        return ctx.badRequest("collection and id are required");
      }

      // Try to resolve full UID
      let uid = collection;

      // If user passed just "article" → resolve to "api::article.article"
      if (!collection.includes("::")) {
        uid = `api::${collection}.${collection}`;
      }

      // Validate collection exists
      const contentType = strapi.contentTypes[uid];
      if (!contentType) {
        return ctx.badRequest(`Collection '${collection}' not found`);
      }

      // Update row (Strapi auto-manages updatedAt)
      const updatedEntry = await strapi.entityService.update(uid, id, {
        data: {},
      });

      ctx.body = {
        message: `Order updated successfully`,
        updated_at: updatedEntry.updatedAt,
      };
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};
