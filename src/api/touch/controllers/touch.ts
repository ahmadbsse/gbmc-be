import { Context } from "koa";
/**
 * A set of functions called "actions" for `touch`
 */

export default {
  async updateTimestamp(ctx: Context) {
    try {
      const { collection, id, itemName } = ctx.request.body;

      if (!collection) {
        return ctx.badRequest("collection name is required");
      }
      if (!id) {
        return ctx.badRequest("id is required");
      }
      if (!itemName) {
        return ctx.badRequest("itemName is required");
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

      const messageCollection = {
        part: `Part ${itemName} successfully moved to first`,
        supplier: `Make ${itemName} successfully moved to first`,
        "sub-assembly": `Assembly ${itemName} successfully moved to first`,
        "engineering-component": `Engineering component ${itemName} successfully moved to first`,
      };

      ctx.body = {
        message:
          messageCollection[collection] ||
          `${itemName} successfully moved to first`,
        updated_at: updatedEntry.updatedAt,
      };
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};
