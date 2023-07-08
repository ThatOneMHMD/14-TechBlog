// Import necessary modules and dependencies
const { Blog } = require('../models');

// Define the data for seeding
const blogData = [
  {
    title: 'What is a blog post?',
    content:
      'A blog post is an individual web page on your website that dives into a particular sub-topic of your blog. For instance, let\'s say you start a fashion blog on your retail website. One blog post might be titled, "The Best Fall Shoes for 2019". The post ties back to your overall blog topic as a whole (fashion), but it also addresses a very particular sub-topic (fall shoes). Blog posts allow you to rank on search engines for a variety of keywords. In the above example, your blog post could enable your business to rank on Google for "fall shoes". When someone searches for fall shoes and comes across your blog post, they have access to the rest of your company\'s website.',
    date_created: new Date(),
    user_id: 1,
  },
  {
    title: 'The Power of Mindfulness: Enhancing Focus and Productivity',
    content: 'In today\'s fast-paced and distraction-filled world, finding ways to enhance focus and productivity has become crucial. One powerful tool that has gained significant attention is mindfulness. In this blog post, we explore the concept of mindfulness and how it can positively impact your daily life, work, and overall well-being. We delve into its meaning and essence, highlighting its core principles of present-moment awareness, non-judgment, and acceptance. We also explore the science behind mindfulness, discussing its effects on the brain, cognitive functioning, attention regulation, emotional regulation, and stress reduction. Practical techniques and exercises are shared to improve focus, concentration, and attention span, along with strategies for applying mindfulness to optimize productivity, foster clarity, reduce distractions, and promote effective decision-making. Emphasizing the role of mindfulness in cultivating a healthy work-life balance, we discuss its benefits in self-care, stress management, and overall happiness. By embracing mindfulness, individuals can tap into its transformative power, unlocking their full potential and leading to greater clarity, reduced stress, and a more balanced and fulfilling existence. Start your mindfulness journey today and experience the positive impact it can have on your life.',
    date_created: new Date(),
    user_id: 2,
  },
  // CAN add more blog entries as needed
];

// Define the seeding function
const seedBlogs = () => {
  return Blog.bulkCreate(blogData);
};

// Export the seeding function
module.exports = seedBlogs;
