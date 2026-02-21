import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'about',
    title: 'Hakkımızda Sayfası',
    type: 'document',
    fields: [
        // 1. Sayfa Başlığı
        defineField({
            name: 'title',
            title: 'Sayfa Başlığı',
            type: 'string',
            description: '📝 "Hakkımızda" sayfasının en üstünde büyük harflerle görünecek başlık. (Örnek: "Zebkare Mimarlık Hakkında")',
            validation: (Rule) => Rule.required(),
        }),

        // 2. Fotoğraf
        defineField({
            name: 'photo',
            title: 'Mimar Fotoğrafı',
            type: 'image',
            description: '🖼️ Hakkımızda sayfasında mimar kartının yanında çıkacak fotoğraf. Dikey (portre) çekilmiş fotoğraflar en iyi görünür.',
            options: { hotspot: true },
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Fotoğraf Açıklaması',
                    type: 'string',
                    description: 'Örnek: "Yüksek Mimar Zahide Nur Berktaş"',
                }),
            ],
        }),

        // 3. Biyografi / Hikâye
        defineField({
            name: 'biography',
            title: 'Biyografi / Ofis Hikâyesi',
            type: 'array',
            description: '✍️ "Hakkımızda" sayfasındaki metni buradan değiştirebilirsiniz. Ofisinizin hikâyesini, misyonunuzu veya mimarların özgeçmişlerini buraya yazın. Araç çubuğundan kalın/italik biçimlendirme yapabilirsiniz.',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal Metin', value: 'normal' },
                        { title: 'Başlık (Büyük)', value: 'h2' },
                        { title: 'Alıntı / Söz', value: 'blockquote' },
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
        prepare({ title, media }) {
            return {
                title: title ?? 'Hakkımızda İçeriği',
                media,
                subtitle: '📄 Hakkımızda Sayfası',
            }
        },
    },
})
