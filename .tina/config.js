import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: "1b2fcbea-3178-409a-8069-1da3e822aec0", // Get this from tina.io
  token: "cac02b31638a62f7434ac63f84544b069c6471cb", // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "posts",
        fields: [
          {
            type: 'string',
            label: 'Title',
            name: 'title',
          },
          {
            type: 'string',
            label: 'Author',
            name: 'author',
          },
          {
            type: 'datetime',
            label: 'Date',
            name: 'date',
          },
          {
            type: 'string',
            label: 'Image',
            name: 'hero_image',
          },
          {
            type: 'string',
            label: 'Body',
            name: 'body',
            isBody: true,
          },
        ],
        ui: {
          // This is an DEMO router. You can remove this to fit your site
          router: ({ document }) => `/demo/blog/${document._sys.filename}`,
        },
      },
    ],
  },
});
