import {Rule} from 'sanity'

export default {
  name: 'gallery',
  title: 'Galleri',
  type: 'object',
  fields: [
    {
      name: 'images',
      title: 'Bilder',
      type: 'array',
      of: [
        {
          name: 'image',
          title: 'Bilde',
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'Alternativ tekst (slug format)',
              type: 'string',
              description: 'Bruk små bokstaver og bindestrek i stedet for mellomrom',
              validation: (rule: Rule) =>
                rule
                  .required()
                  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
                    name: 'slug',
                    invert: false,
                  })
                  .error('Må være i slug-format: små bokstaver og bindestreker'),
            },
          ],
        },
      ],
    },
    // {
    //   name: 'zoom',
    //   type: 'boolean',
    //   title: 'Zoom enabled',
    //   description: 'Should we enable zooming of images?',
    // },
  ],
}
