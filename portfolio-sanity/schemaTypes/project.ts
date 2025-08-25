import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Prosjekt',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'assignmentType',
      title: 'Oppdragstype',
      type: 'string',
      options: {
        list: [
          { title: 'Profesjonell', value: 'professional' },
          { title: 'Akademisk', value: 'academic' },
          { title: 'Publikasjon', value: 'publication' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'squareFootage',
      title: 'Kvadratmeter',
      type: 'number',
    }),
    defineField({
      name: 'authors',
      title: 'Forfattere',
      type: 'array',
      of: [{ type: 'string', }],
    }),
    defineField({
      name: 'images',
      title: 'Bilder',
      type: 'gallery',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedYear',
      title: 'Publiseringsår',
      type: 'number',
      validation: (rule) => rule.integer().greaterThan(0).lessThan(9999),
      initialValue: () => new Date().getFullYear(),
    }),
    defineField({
      name: 'summary',
      title: 'Oppsummering',
      type: 'text',
    }),
  ],
})
