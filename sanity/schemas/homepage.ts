import { defineField, defineType } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage Settings",
  type: "document",
  fields: [
    defineField({
      name: "heroPaintings",
      title: "Hero Paintings",
      description: "Select the hero painting for the homepage",
      type: "array",
      of: [{ type: "reference", to: [{ type: "artwork" }] }],
      validation: (rule) => rule.min(1).max(5),
    }),
    defineField({
      name: "featuredWorks",
      title: "Featured Works (Horizontal Scroll)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "artwork" }] }],
    }),
    defineField({
      name: "processImages",
      title: "Process Section Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "processText",
      title: "Process Text",
      type: "object",
      fields: [
        { name: "es", type: "blockContent", title: "Español" },
        { name: "en", type: "blockContent", title: "English" },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Homepage Settings" }) },
});
