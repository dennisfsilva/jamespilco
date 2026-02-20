import { defineField, defineType } from "sanity";

export default defineType({
  name: "artist",
  title: "Artist / About",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "object",
      fields: [
        { name: "es", type: "blockContent", title: "Español" },
        { name: "en", type: "blockContent", title: "English" },
      ],
    }),
    defineField({
      name: "statement",
      title: "Artist Statement",
      type: "object",
      fields: [
        { name: "es", type: "blockContent", title: "Español" },
        { name: "en", type: "blockContent", title: "English" },
      ],
    }),
    defineField({
      name: "portrait",
      title: "Portrait Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "studioPhotos",
      title: "Studio Photos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "exhibitions",
      title: "Exhibitions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              type: "object",
              fields: [
                { name: "es", type: "string", title: "Español" },
                { name: "en", type: "string", title: "English" },
              ],
            },
            { name: "venue", type: "string", title: "Venue" },
            { name: "location", type: "string", title: "Location" },
            { name: "year", type: "number", title: "Year" },
            {
              name: "type",
              type: "string",
              title: "Type",
              options: {
                list: [
                  { title: "Solo", value: "solo" },
                  { title: "Group", value: "group" },
                  { title: "Fair", value: "fair" },
                ],
              },
            },
          ],
          preview: {
            select: {
              title: "title.en",
              subtitle: "venue",
            },
          },
        },
      ],
    }),
    defineField({
      name: "press",
      title: "Press",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "publication", type: "string", title: "Publication" },
            { name: "url", type: "url", title: "URL" },
            { name: "date", type: "date", title: "Date" },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "publication",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "name" },
  },
});
