// Import necessary modules and dependencies
const { Blog } = require('../models');

// Define the data for seeding
const blogData = [
  {
    title: 'What is a blog post?',
    content:
      'A blog post is an individual web page on your website that dives into a particular sub-topic of your blog. For instance, let\'s say you start a fashion blog on your retail website. One blog post might be titled, "The Best Fall Shoes for 2019". The post ties back to your overall blog topic as a whole (fashion), but it also addresses a very particular sub-topic (fall shoes). Blog posts allow you to rank on search engines for a variety of keywords. In the above example, your blog post could enable your business to rank on Google for "fall shoes". When someone searches for fall shoes and comes across your blog post, they have access to the rest of your company\'s website. They might click "Products" after they read your post, and take a look at the clothing items your company sells. A blog post links back to your overall blog site. For instance, right now, you\'re on blog.hubspot.com/marketing/what-is-a-blog. The "what-is-a-blog" section of the URL is tied back to /marketing/, which is the blog as a whole.',
    date_created: new Date(),
    user_id: 1,
  },
  {
    title: 'The Power of Mindfulness: Enhancing Focus and Productivity',
    content: 'Introduction:\nIn today\'s fast-paced and distraction-filled world, finding ways to enhance focus and productivity has become crucial. One powerful tool that has gained significant attention is mindfulness. In this blog post, we will explore the concept of mindfulness and how it can positively impact your daily life, work, and overall well-being.\n\Understanding Mindfulness: Delve into the meaning and essence of mindfulness, its origins in ancient practices, and its relevance in the modern world. Highlight its core principles of present-moment awareness, non-judgment, and acceptance.\nThe Science Behind Mindfulness: Explore scientific research and studies that have examined the effects of mindfulness on the brain and cognitive functioning. Discuss how mindfulness practices can promote attention regulation, emotional regulation, and stress reduction.\nBoosting Focus and Concentration: Share practical mindfulness techniques and exercises that can help improve focus, concentration, and attention span. Provide tips on incorporating mindfulness into daily routines and work environments.\nEnhancing Productivity: Explain how mindfulness can optimize productivity by fostering clarity, reducing distractions, and promoting effective decision-making. Discuss strategies for applying mindfulness to task management, goal setting, and time allocation.\nCultivating Work-Life Balance: Emphasize the role of mindfulness in creating a healthy work-life balance. Discuss how mindfulness practices can enhance self-care, stress management, and overall happiness, leading to increased productivity and satisfaction in both personal and professional domains.\nConclusion:\nBy embracing mindfulness, you can tap into its transformative power to enhance your focus, productivity, and overall well-being. Incorporating mindful practices into your daily life can lead to greater clarity, reduced stress, and a more balanced and fulfilling existence. Start your mindfulness journey today and unlock your full potential.',
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
