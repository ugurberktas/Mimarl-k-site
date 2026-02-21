import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Proje',
    type: 'document',
    fields: [
        // 1. Proje Başlığı
        defineField({
            name: 'title',
            title: 'Proje Başlığı',
            type: 'string',
            description: '📝 Projenin adını buraya yazın. (Örnek: "Çukurova Villaları", "Ofis Yenileme")',
            validation: (Rule) => Rule.required().min(1).max(120),
        }),

        // 2. URL (Slug)
        defineField({
            name: 'slug',
            title: 'Sayfa Adresi (URL)',
            type: 'slug',
            description: '🔗 Proje başlığını yazdıktan sonra sağdaki "Generate" butonuna basın — otomatik dolar. Elle dokunmanıza gerek yok.',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),

        // 3. Kapak Fotoğrafı
        defineField({
            name: 'mainImage',
            title: 'Kapak Fotoğrafı',
            type: 'image',
            description: '🖼️ Sitenin ana sayfasında ve proje kartında görünecek fotoğraf. En iyi sonuç için yatay ve yüksek çözünürlüklü bir fotoğraf seçin.',
            options: {
                hotspot: true, // Fotoğrafın odak noktasını elle belirleyebilirsiniz
            },
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Fotoğraf Açıklaması (Alt Metin)',
                    type: 'string',
                    description: 'Örnek: "Çukurova Villaları cephe görünümü" — Arama motoru ve erişilebilirlik için önemlidir.',
                }),
            ],
        }),

        // 4. Fotoğraf Galerisi
        defineField({
            name: 'gallery',
            title: 'Fotoğraf Galerisi',
            type: 'array',
            description: '📸 Projeye ait diğer fotoğrafları buraya ekleyin. Birden fazla fotoğrafı aynı anda sürükleyip bırakabilirsiniz.',
            of: [
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: 'alt',
                            title: 'Fotoğraf Açıklaması',
                            type: 'string',
                            description: 'Bu fotoğrafın kısaca ne gösterdiğini yazın.',
                        }),
                    ],
                },
            ],
        }),

        // 5. Proje Açıklaması
        defineField({
            name: 'description',
            title: 'Proje Açıklaması',
            type: 'array',
            description: '✍️ Proje hakkında birkaç cümle yazın. Üst araç çubuğundan kalın, italik veya başlık gibi biçimlendirmeleri kullanabilirsiniz.',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal Metin', value: 'normal' },
                        { title: 'Başlık (Büyük)', value: 'h2' },
                        { title: 'Başlık (Orta)', value: 'h3' },
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
            description: '📅 Projenin teslim yılını girin. Sadece 4 haneli yıl yazın. (Örnek: 2024)',
            validation: (Rule) =>
                Rule.regex(/^\d{4}$/, { name: 'yıl formatı', invert: false }).warning(
                    '⚠️ Lütfen sadece 4 haneli bir yıl girin (örn. 2024)'
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
                title: title ?? 'İsimsiz Proje',
                media,
                subtitle: subtitle ? `📅 ${subtitle}` : 'Yıl girilmemiş',
            }
        },
    },
})
