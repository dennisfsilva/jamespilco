import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        { name: "es", type: "string", title: "Español" },
        { name: "en", type: "string", title: "English" },
      ],
    }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title.en" } }),
    defineField({
      name: "type",
      title: "Category Type",
      type: "string",
      options: {
        list: [
          { title: "Medium", value: "medium" },
          { title: "Subject", value: "subject" },
          { title: "Size", value: "size" },
        ],
      },
    }),
  ],
  preview: { select: { title: "title.en", subtitle: "type" } },
});
