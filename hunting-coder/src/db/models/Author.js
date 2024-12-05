import mongoose, { model, models, Schema, set } from 'mongoose';  // import mongoose module

const AuthorSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: "Author",
        set: (role) => !role ? "Author" : role
    },
    bio: {
        type: String,
        default: 'No bio available yet',
        set: (bio) => !bio ? 'No bio available yet' : bio
    },
    image: {
        type: String,
        required: true,
        unique: true
    }
});

export default models.Author || model("Author", AuthorSchema);