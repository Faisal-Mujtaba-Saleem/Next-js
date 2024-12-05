import mongoose, { model, models, Schema, set } from 'mongoose';
import slugify from 'slugify';

const default_image_url = 'https://dummyimage.com/400x250/808080/000000&text=Hunting-Coder';

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true
    },
    content: {
        html_content: {
            type: String,
            required: true
        },
        md_content: {
            type: String,
            required: true
        },
    },
    slug: {
        type: String,
        unique: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    image_url: {
        type: String,
        default: default_image_url,
        set: (url) => url.startsWith('http') ? url : default_image_url
    },
    publishedAt: {
        type: Date,
        default: Date.now
    }
});

// Post-findOneAndUpdate hook to update the slug after an update operation
postSchema.post('findOneAndUpdate', async function (result, next) {

    if (result) {
        // Ensure slug is updated based on title and ID
        const updated_slug = slugify(result.title, { lower: true, strict: true, replace: '-' });
        if (result.slug !== updated_slug) {
            result.slug = updated_slug;
            await result.save();  // Save to update the slug
        }
    }
    next();
});

export default models.Post || model('Post', postSchema);
