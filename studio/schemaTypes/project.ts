import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Proje',
    type: 'document',
    fields: [
        // 1. Başlık
        defineField({
            name: 'title',
            title: 'Başlık',
            type: 'string',
            validation: (Rule) => Rule.required().min(1).max(120),
        }),

        // 2. URL (Slug) - başlıktan otomatik üretilir
        defineField({
            name: 'slug',
            title: 'URL (Slug)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),

        // 3. Kapak Fotoğrafı - hotspot açık
        defineField({
            name: 'mainImage',
            title: 'Kapak Fotoğrafı',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alt Metin',
                    type: 'string',
                    description: 'Erişilebilirlik için açıklayıcı bir metin girin.',
                }),
            ],
        }),

        // 4. Fotoğraf Galerisi
        defineField({
            name: 'gallery',
            title: 'Fotoğraf Galerisi',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: 'alt',
                            title: 'Alt Metin',
                            type: 'string',
                        }),
                    ],
                },
            ],
        }),

        // 5. Açıklama (zengin metin - block content)
        defineField({
            name: 'description',
            title: 'Açıklama',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'Başlık 2', value: 'h2' },
                        { title: 'Başlık 3', value: 'h3' },
                        { title: 'Alıntı', value: 'blockquote' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Kalın', value: 'strong' },
                            { title: 'İtalik', value: 'em' },
                            { title: 'Altı Çizili', value: 'underline' },
                        ],
                    },
                },
            ],
        }),

        // 6. Tamamlanma Yılı
        defineField({
            name: 'completionDate',
            title: 'Tamamlanma Yılı',
            type: 'string',
            description: 'Örnek: 2024',
            validation: (Rule) =>
                Rule.regex(/^\d{4}$/, { name: 'Yıl formatı', invert: false }).warning(
                    '4 haneli bir yıl girin (örn. 2024)'
                ),
        }),
    ],

    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
            subtitle: 'completionDate',
        },
        prepare({ title, media, subtitle }) {
            return {
                title: title ?? 'Başlıksız Proje',
                media,
                subtitle: subtitle ? `Yıl: ${subtitle}` : '',
            }
        },
    },
})
