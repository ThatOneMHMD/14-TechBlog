// Import necessary modules and dependencies
const { Comment } = require('../models');

// Define the data for seeding
const commentData = [
  {
    content:
      'I couldn\'t agree more with the power of mindfulness in enhancing focus and productivity! Incorporating mindfulness into my daily routine has truly been a game-changer. It has helped me cultivate a greater sense of awareness and stay present in the moment, which has significantly improved my ability to concentrate on tasks at hand. The mindfulness techniques mentioned in this blog post are practical and easy to implement. I especially found the tips on incorporating mindfulness into work environments to be valuable. It\'s amazing how a few moments of mindful breathing or a short meditation can make a big difference in reducing stress and increasing productivity. Thank you for sharing such insightful information!',
    user_id: 1,
    blog_id: 2,
  },
  {
    content: 'I found this blog post to be incredibly informative and well-written. It\'s fascinating to learn about the significance of blog posts in the context of a website\'s overall content strategy. The example provided about a fashion blog and its sub-topic on fall shoes really helped me grasp the concept. It\'s impressive how blog posts not only contribute to the overall theme of a blog but also play a crucial role in search engine optimization. The idea of ranking on Google for specific keywords through blog posts is intriguing and highlights the potential for increased visibility and traffic. I appreciate the clear explanation and the practical example given. This post has definitely expanded my understanding of the importance and impact of blog posts. Great job!',
    user_id: 2,
    blog_id: 1,
  },
  {
    content: 'Thank you for your kind words, John!',
    user_id: 2,
    blog_id: 2,
  },
  // can add more comments as needed
];

// Define the seeding function
const seedComments = () => {
  return Comment.bulkCreate(commentData);
};

// Export the seeding function
module.exports = seedComments;
