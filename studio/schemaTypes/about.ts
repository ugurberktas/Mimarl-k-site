import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'about',
    title: 'Hakkımızda',
    type: 'document',
    fields: [
        // Başlık
        defineField({
            name: 'title',
            title: 'Başlık',
            type: 'string',
            description: 'Hakkımızda sayfası ana başlığı (örn. "Zebkare Mimarlık Hakkında")',
            validation: (Rule) => Rule.required(),
        }),

        // Dayının / Mimarın Fotoğrafı
        defineField({
            name: 'photo',
            title: 'Fotoğraf',
            type: 'image',
            options: { hotspot: true },
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alt Metin',
                    type: 'string',
                }),
            ],
        }),

        // Biyografi / Hikâye (zengin metin)
        defineField({
            name: 'biography',
            title: 'Biyografi / Hikâye',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'Başlık 2', value: 'h2' },
                        { title: 'Alıntı', value: 'blockquote' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Kalın', value: 'strong' },
                            { title: 'İtalik', value: 'em' },
                        ],
                    },
                },
            ],
        }),
    ],

    preview: {
        select: {
            title: 'title',
            media: 'photo',
        },
    },
})
