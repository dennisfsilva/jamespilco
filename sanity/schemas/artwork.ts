import { defineField, defineType } from "sanity";

export default defineType({
  name: "artwork",
  title: "Artwork",
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (rule) => rule.min(1).required(),
    }),
    defineField({
      name: "medium",
      title: "Medium",
      type: "object",
      fields: [
        { name: "es", type: "string", title: "Español" },
        { name: "en", type: "string", title: "English" },
      ],
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions",
      type: "object",
      fields: [
        { name: "width", type: "number", title: "Width (cm)" },
        { name: "height", type: "number", title: "Height (cm)" },
        { name: "depth", type: "number", title: "Depth (cm)" },
      ],
    }),
    defineField({ name: "year", title: "Year", type: "number" }),
    defineField({ name: "price", title: "Price (USD)", type: "number" }),
    defineField({
      name: "availability",
      title: "Availability",
      type: "string",
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "Sold", value: "sold" },
          { title: "Reserved", value: "reserved" },
          { title: "Not for Sale", value: "nfs" },
          { title: "Donated", value: "donated" },
        ],
      },
      initialValue: "available",
    }),
    defineField({
      name: "description",
      title: "Description / Story",
      type: "object",
      fields: [
        { name: "es", type: "blockContent", title: "Español" },
        { name: "en", type: "blockContent", title: "English" },
      ],
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [
    { title: "Year, New", name: "yearDesc", by: [{ field: "year", direction: "desc" }] },
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title.en", subtitle: "medium.en", media: "images.0" },
  },
});
