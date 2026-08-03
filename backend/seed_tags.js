require('dotenv').config();
const mongoose = require('mongoose');
const Tag = require('./models/TagsSchema');
const slugify = require('slugify');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(async () => {
    const tags = ['JavaScript', 'Python', 'React', 'Backend', 'Frontend', 'Database', 'Algorithms', 'UI/UX'];
    for (let t of tags) {
        try {
            await Tag.create({ name: t, slug: slugify(t).toLowerCase() });
            console.log('Created tag:', t);
        } catch(e) {
            console.log('Skipping', t, e.code === 11000 ? '(exists)' : e.message);
        }
    }
    console.log('Done');
    process.exit(0);
});
