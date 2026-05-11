import {defineField, defineType} from 'sanity'

export const landingType = defineType({
  name: 'landing',
  title: 'Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {name: 'headline', title: 'Headline', type: 'string'},
        {name: 'subheadline', title: 'Subheadline', type: 'string'},
        {name: 'cta_text', title: 'CTA Button Text', type: 'string'},
        {name: 'cta_subtext', title: 'CTA Subtext', type: 'string'},
        {name: 'urgency_badge', title: 'Urgency Badge', type: 'string'},
        {name: 'name', title: 'Instructor Name', type: 'string'},
        {name: 'title', title: 'Instructor Title', type: 'string'},
        {name: 'experience', title: 'Experience', type: 'string'},
        {name: 'price', title: 'Price', type: 'string'},
        {name: 'original_price', title: 'Original Price', type: 'string'},
        {name: 'image', title: 'Instructor Image URL', type: 'string'},
        {
          name: 'meta',
          title: 'Meta Info Badges',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'icon', title: 'Icon (emoji)', type: 'string'},
                {name: 'label', title: 'Label', type: 'string'},
                {name: 'value', title: 'Value', type: 'string'},
              ],
            },
          ],
        },
        {
          name: 'offer_badge',
          title: 'Offer Badges',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'emoji', title: 'Emoji', type: 'string'},
                {name: 'text', title: 'Text', type: 'string'},
              ],
            },
          ],
        },
      ],
    }),

    defineField({
      name: 'what_you_learn',
      title: "What You'll Learn",
      type: 'object',
      fields: [
        {name: 'headline', title: 'Headline', type: 'string'},
        {
          name: 'points',
          title: 'Points',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'image', title: 'Image URL', type: 'string'},
                {name: 'title', title: 'Title', type: 'string'},
                {name: 'description', title: 'Description', type: 'string'},
              ],
            },
          ],
        },
      ],
    }),

    defineField({
      name: 'curriculum',
      title: 'Curriculum',
      type: 'object',
      fields: [
        {name: 'headline', title: 'Headline', type: 'string'},
        {
          name: 'modules',
          title: 'Modules',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'time', title: 'Time', type: 'string'},
                {name: 'title', title: 'Title', type: 'string'},
                {name: 'description', title: 'Description', type: 'string'},
              ],
            },
          ],
        },
      ],
    }),

    defineField({
      name: 'instructor',
      title: 'Instructor',
      type: 'object',
      fields: [
        {name: 'name', title: 'Name', type: 'string'},
        {name: 'title', title: 'Title', type: 'string'},
        {name: 'image', title: 'Image URL', type: 'string'},
        {name: 'followerCount', title: 'Follower Count', type: 'string'},
        {name: 'followerLabel', title: 'Follower Label', type: 'string'},
        {
          name: 'bioParagraphs',
          title: 'Bio Paragraphs',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'text', title: 'Paragraph Text', type: 'text'},
                {
                  name: 'boldPhrases',
                  title: 'Bold Phrases',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        {name: 'phrase', title: 'Phrase', type: 'string'},
                      ]
                    }
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'credentials',
          title: 'Credentials',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'point', title: 'Point', type: 'string'}
              ]
            }
          ],
        },
      ],
    }),

    defineField({
      name: 'social_proof',
      title: 'Social Proof',
      type: 'object',
      fields: [
        {name: 'headline', title: 'Headline', type: 'string'},
        {
          name: 'stats',
          title: 'Stats',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'number', title: 'Number', type: 'string'},
                {name: 'label', title: 'Label', type: 'string'},
              ],
            },
          ],
        },
        {
          name: 'testimonials',
          title: 'Testimonials',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'name', title: 'Name', type: 'string'},
                {name: 'title', title: 'Title', type: 'string'},
                {name: 'avatar', title: 'Avatar URL', type: 'string'},
                {name: 'quote', title: 'Quote', type: 'text'},
              ],
            },
          ],
        },
      ],
    }),

    defineField({
      name: 'who_is_this_for',
      title: 'Who Is This For',
      type: 'object',
      fields: [
        {name: 'headline', title: 'Headline', type: 'string'},
        {
          name: 'audience',
          title: 'Audience (For)',
          type: 'array',
          of: [{type: 'object', fields: [{name: 'point', title: 'Point', type: 'string'}]}],
        },
        {
          name: 'not_for',
          title: 'Not For',
          type: 'array',
          of: [{type: 'object', fields: [{name: 'point', title: 'Point', type: 'string'}]}],
        },
      ],
    }),

    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'object',
      fields: [
        {name: 'headline', title: 'Headline', type: 'string'},
        {
          name: 'items',
          title: 'Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'question', title: 'Question', type: 'string'},
                {name: 'answer', title: 'Answer', type: 'text'},
              ],
            },
          ],
        },
      ],
    }),

    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        {name: 'company_name', title: 'Company Name', type: 'string'},
        {name: 'tagline', title: 'Tagline', type: 'string'},
        {name: 'refund_policy', title: 'Refund Policy', type: 'string'},
      ],
    }),

    defineField({
      name: 'masterclass',
      title: 'Masterclass',
      type: 'object',
      fields: [
        {name: 'title', title: 'Title', type: 'string'},
        {name: 'tagline', title: 'Tagline', type: 'string'},
        {name: 'date', title: 'Date', type: 'datetime'},
        {name: 'time', title: 'Time', type: 'string'},
        {name: 'duration', title: 'Duration', type: 'string'},
        {name: 'mode', title: 'Mode', type: 'string'},
        {name: 'language', title: 'Language', type: 'string'},
        {name: 'price', title: 'Price', type: 'string'},
        {name: 'original_price', title: 'Original Price', type: 'string'},
      ],
    }),

    defineField({
      name: 'register_form',
      title: 'Register Form',
      type: 'object',
      fields: [
        {name: 'headline', title: 'Headline', type: 'string'},
        {name: 'subheadline', title: 'Subheadline', type: 'string'},
        {name: 'button_text', title: 'Button Text', type: 'string'},
        {name: 'success_message', title: 'Success Message', type: 'string'},
        {name: 'fields_note', title: 'Fields Note', type: 'string'},
        {
          name: 'benefits',
          title: 'Benefits',
          type: 'array',
          of: [{type: 'object', fields: [{name: 'benefit', title: 'Benefit', type: 'string'}]}],
        },
      ],
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {name: 'title', title: 'Meta Title', type: 'string'},
        {name: 'description', title: 'Meta Description', type: 'text'},
        {name: 'og_image', title: 'OG Image URL', type: 'string'},
      ],
    }),

    defineField({
      name: 'section_order',
      title: 'Section Order',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Hero', value: 'hero'},
          {title: 'Webinar Hero', value: 'webinar_hero'},
          {title: 'What You Learn', value: 'what_you_learn'},
          {title: 'Curriculum', value: 'curriculum'},
          {title: 'Instructor', value: 'instructor'},
          {title: 'Social Proof', value: 'social_proof'},
          {title: 'Testimonials', value: 'testimonials'},
          {title: 'Who Is This For', value: 'who_is_this_for'},
          {title: 'FAQ', value: 'faq'},
          {title: 'Footer', value: 'footer'},
        ],
      },
    }),

    defineField({
      name: 'labels',
      title: 'Global Labels',
      type: 'object',
      fields: [
        {name: 'live', title: 'Live', type: 'string'},
        {name: 'experience', title: 'Experience', type: 'string'},
        {name: 'course_curriculum', title: 'Course Curriculum', type: 'string'},
        {name: 'modules_included', title: 'Modules Included', type: 'string'},
        {name: 'meet_your_coach', title: 'Meet Your Coach', type: 'string'},
        {name: 'this_is_for_you_if', title: 'This Is For You If...', type: 'string'},
        {name: 'this_is_not_for_you_if', title: 'This Is NOT For You If...', type: 'string'},
        {name: 'vs', title: 'vs', type: 'string'},
        {name: 'back', title: 'Back', type: 'string'},
        {name: 'live_masterclass', title: 'Live Masterclass Label', type: 'string'},
        {name: 'what_you_will_gain', title: "What you'll gain", type: 'string'},
        {name: 'people_registered', title: 'People registered text', type: 'string'},
        {name: 'free_registration', title: 'Free Registration', type: 'string'},
        {name: 'reserve_your_spot', title: 'Reserve Your Spot', type: 'string'},
        {name: 'fill_details', title: 'Fill in your details text', type: 'string'},
        {name: 'secured_by', title: 'Secured by Razorpay text', type: 'string'},
        {name: 'confirm_seat', title: 'Confirm Seat text', type: 'string'},
        {name: 'one_time', title: 'One-time text', type: 'string'},
      ],
    }),
  ],
})
