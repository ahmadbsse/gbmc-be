export default ({ env }) => {
  const isDevelopment = env.bool("IS_DEVELOPMENT", false);

  if (isDevelopment) {
    console.log("✅ Using local upload provider (development mode).");
    return {};
  }

  const accessKeyId = env("AWS_ACCESS_KEY_ID");
  const secretAccessKey = env("AWS_ACCESS_SECRET");
  const region = env("AWS_REGION");
  const bucket = env("AWS_BUCKET");
  const baseUrl = env("AWS_CLOUDFRONT_URL");

  if (!accessKeyId || !secretAccessKey || !region || !bucket || !baseUrl) {
    console.error("❌ Missing AWS S3 credentials or configuration.");
    console.error("Make sure the following environment variables are set:");
    console.error(" - AWS_ACCESS_KEY_ID");
    console.error(" - AWS_ACCESS_SECRET");
    console.error(" - AWS_REGION");
    console.error(" - AWS_BUCKET");
    console.error(" - AWS_CLOUDFRONT_URL");
    return {};
  }

  console.log("✅ AWS S3 upload provider initialized.");

  return {
    upload: {
      config: {
        provider: "aws-s3",
        providerOptions: {
          baseUrl,
          s3Options: {
            credentials: {
              accessKeyId,
              secretAccessKey,
            },
            region,
          },
          params: {
            signedUrlExpires: env.int("AWS_SIGNED_URL_EXPIRES", 15 * 60),
            Bucket: bucket,
          },
        },
        actionOptions: {
          upload: { ACL: null },
          uploadStream: { ACL: null },
          delete: {},
        },
      },
    },
  };
};
