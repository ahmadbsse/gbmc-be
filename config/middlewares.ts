export default [
  "strapi::logger",
  "strapi::errors",
  /* Replace 'strapi::security', with this snippet */
  /* Beginning of snippet */
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "dl.airtable.com",
            "gbmc-files.s3.eu-central-1.amazonaws.com",
            "d1m321zr0yue3p.cloudfront.net"
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "dl.airtable.com",
            "gbmc-files.s3.eu-central-1.amazonaws.com",
            "d1m321zr0yue3p.cloudfront.net"
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
