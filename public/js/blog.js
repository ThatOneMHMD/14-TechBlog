// Note that the process for the code is almost the same for the all the CRUD methods hence I will be consice in my explanations and comments!

// Add Comment:
// Select all elements with the class 'addComment' and 'addCommentSection'
const addCommentButtons = document.querySelectorAll('.addComment');
const addCommentSections = document.querySelectorAll('.addCommentSection');

// Iterate over each addComment button
addCommentButtons.forEach((button, index) => {
  // Get the corresponding addCommentSection based on the index
  const addCommentSection = addCommentSections[index];

  // Add the 'comment-card' class to the addCommentSection
  addCommentSection.classList.add('comment-card');

  // Add a click event listener to the button
  button.addEventListener('click', async () => {
    // Fetch user data from the '/api/users' endpoint
    const userResponse = await fetch('/api/users');
    const userData = await userResponse.json();
    const userID = userData.id;

    if (!userID) {
      // User is not logged in or no user data available

      // Create a login warning element
      const loginWarning = document.createElement('h6');
      loginWarning.textContent = 'Please Login To Add Comments';
      loginWarning.style.color = 'red';

      // Create an anchor tag for the login link
      const anchorTag = document.createElement('a');
      anchorTag.href = '/login';
      anchorTag.appendChild(loginWarning);

      // Replace the button with the login warning
      addCommentSection.replaceChild(anchorTag, button);

      return;
    }

    // Create a textarea element for entering the comment
    const textarea = document.createElement('textarea');
    textarea.placeholder = 'Enter your comment...';
    textarea.style.width = '100%';

    // Move the textarea to the top to make it look better
    addCommentSection.insertBefore(textarea, addCommentSection.firstChild);

    // Create a submit button for submitting the comment
    const submitButton = document.createElement('button');
    submitButton.classList.add('submitComment');
    submitButton.textContent = 'Submit Comment';

    // Replace the button with the submit button
    addCommentSection.replaceChild(submitButton, button);

    submitButton.addEventListener('click', async () => {
      // Get the content of the textarea
      const content = textarea.value.trim();

      // Fetch user data again in case it changed
      const userResponse = await fetch('/api/users');
      const userData = await userResponse.json();
      const user_id = userData.id;
      const blog_id = button.dataset.blogId;

      // Send a POST request to the '/api/comments' endpoint with the comment data
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ content, user_id, blog_id }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // If the request is successful, reload the page to reflect the changes
        document.location.reload();
      } else {
        // If there is an error, display the status text of the response
        alert(response.statusText);
      }
    });
  });
});

// NEW CODE HERE:

// Delete Comment
// Select all elements with the class 'deleteComment'
const deleteButtons = document.querySelectorAll('.deleteComment');

// Add event listener to each delete button
deleteButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    // Get the comment ID and comment user ID from the button's dataset
    const commentId = button.dataset.commentId;
    const commentUserId = Number(button.dataset.commentUserId);

    // Fetch user data from the '/api/users' endpoint
    const userResponse = await fetch('/api/users');
    const userData = await userResponse.json();
    const currentUserId = userData.id;

    // Check if the current user ID matches the comment user ID
    if (currentUserId !== commentUserId) {
      // If the user ID doesn't match, display a warning message

      // Select all elements with the class 'deleteCommentWarning'
      const deleteCommentWarnings = document.querySelectorAll(
        '.deleteCommentWarning'
      );

      // Iterate over each deleteCommentWarning element
      deleteCommentWarnings.forEach((deleteCommentWarning) => {
        // Remove any existing warning messages
        const existingWarnings = deleteCommentWarning.querySelectorAll('h6');
        existingWarnings.forEach((existingWarning) => {
          deleteCommentWarning.removeChild(existingWarning);
        });

        // Create and append the new warning message
        const warningMessage = document.createElement('h6');
        warningMessage.textContent =
          'WARNING: You are not authorized to delete this comment!';

        const anchorTag = document.createElement('a');
        anchorTag.href = '/login';
        anchorTag.style.color = 'red';
        anchorTag.appendChild(warningMessage);
        deleteCommentWarning.appendChild(anchorTag);
      });

      return;
    }

    // Send a DELETE request to the server to delete the comment
    const response = await fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
    });

    // if response is ok, then show changes by refreshing page, alert of err
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Oops! Something went wrong!');
    }
  });
});

// NEW CODE HERE:

// Add new blog functionality
// Select elements with the corresponding classes
const addBlogButton = document.querySelector('.addBlogButton');
const addBlogForm = document.querySelector('.addBlogForm');
const submitBlogButton = document.querySelector('.submitBlog');

// Add event listener to show the add blog form when the button is clicked
addBlogButton.addEventListener('click', () => {
  addBlogButton.classList.add('hidden');
  addBlogForm.classList.remove('hidden');
});

// Add event listener to handle the submission of the blog form
submitBlogButton.addEventListener('click', async () => {
  // Fetch user data from the '/api/users' endpoint
  const userResponse = await fetch('/api/users');
  const userData = await userResponse.json();
  const userID = userData.id;

  if (!userID) {
    // User is not logged in or no user data available
    const newBlogWarning = document.querySelector('.newBlogWarning');

    // Check if a warning message already exists
    const existingWarning = newBlogWarning.querySelector('h6');
    if (existingWarning) {
      // Remove the existing warning message
      newBlogWarning.removeChild(existingWarning);
    }

    // Create and append the new warning message
    const warningMessage = document.createElement('h6');
    warningMessage.textContent = 'WARNING: Please login to add a blog!';
    warningMessage.style.color = 'yellow';
    newBlogWarning.appendChild(warningMessage);

    return;
  }

  // Get the title and content inputs
  const titleInput = document.getElementById('blogTitle');
  const contentInput = document.getElementById('blogContent');
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (title && content) {
    // Send a POST request to the '/api/blogs' endpoint to add the new blog
    const response = await fetch('/api/blogs', {
      method: 'POST',
      body: JSON.stringify({ title, content, user_id: userID }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If the request is successful, reload the page to see the newly added blog
      location.reload();
    } else {
      const newBlogWarning = document.querySelector('.newBlogWarning');

      // Check if a warning message already exists
      const existingWarning = newBlogWarning.querySelector('h6');
      if (existingWarning) {
        // Remove the existing warning message
        newBlogWarning.removeChild(existingWarning);
      }

      // Create and append the new warning message
      const warningMessage = document.createElement('h6');
      warningMessage.textContent = 'WARNING: Failed to add new blog!';
      warningMessage.style.textShadow = 'red';
      newBlogWarning.appendChild(warningMessage);
    }
  } else {
    const newBlogWarning = document.querySelector('.newBlogWarning');

    // Check if a warning message already exists
    const existingWarning = newBlogWarning.querySelector('h6');
    if (existingWarning) {
      // Remove the existing warning message
      newBlogWarning.removeChild(existingWarning);
    }

    // Create and append the new warning message
    const warningMessage = document.createElement('h6');
    warningMessage.textContent = 'WARNING: Please fill in empty fields!';
    warningMessage.style.color = 'yellow';
    newBlogWarning.appendChild(warningMessage);
  }
});

// NEW CODE HERE:

// Delete Blog functionality. Note that this is less complicated than the "delete comment" code because the person who has access to the delete blog button is only the user, through the /dashboard dashboard. Hence, no need for user authintication to be directly made for each button!

// Select all delete blog buttons
const deleteBlogButtons = document.querySelectorAll('.deleteBlog');

// Add event listener to each delete blog button
deleteBlogButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    // Get the blog ID from the button's dataset
    const blogId = button.dataset.blogId;

    try {
      // Send a DELETE request to the '/api/blogs/:blogId' endpoint to delete the blog
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // If the request is successful, reload the page to see the updated blog list
        location.reload();
      }
    } catch (error) {
      alert('Oops! An error occurred while deleting the blog.');
    }
  });
});

// NEW CODE HERE:

// Update Blog functionality

// Select all edit blog buttons
const editBlogButtons = document.querySelectorAll('.editBlog');

// Add event listener to each edit blog button
editBlogButtons.forEach((editBlogButton) => {
  editBlogButton.addEventListener('click', () => {
    // Find the corresponding elements for the blog being edited
    const blogCard = editBlogButton.closest('.blog-card');
    const blogTitle = blogCard.querySelector('.blog-title');
    const blogContent = blogCard.querySelector('.blog-content');
    const updateBlogButton = blogCard.querySelector('.updateBlog');

    // Create a textarea for the blog title
    const titleTextarea = document.createElement('textarea');
    titleTextarea.classList.add('blog-title-input');
    titleTextarea.placeholder = blogTitle.textContent;
    titleTextarea.value = blogTitle.textContent;

    // Replace the blog title with the textarea
    blogTitle.parentNode.replaceChild(titleTextarea, blogTitle);

    // Create a textarea for the blog content
    const contentTextarea = document.createElement('textarea');
    contentTextarea.classList.add('blog-content-input');
    contentTextarea.placeholder = blogContent.textContent;
    contentTextarea.value = blogContent.textContent;

    // Replace the blog content with the textarea
    blogContent.parentNode.replaceChild(contentTextarea, blogContent);

    // Hide the edit button and show the update button
    editBlogButton.classList.add('hidden');
    updateBlogButton.classList.remove('hidden');
  });
});

// Select all update blog buttons
const updateBlogButtons = document.querySelectorAll('.updateBlog');

// Add event listener to each update blog button
updateBlogButtons.forEach((updateBlogButton) => {
  updateBlogButton.addEventListener('click', async () => {
    // Get the input values for the updated blog
    const titleInput = document.querySelector('.blog-title-input');
    const contentInput = document.querySelector('.blog-content-input');
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    // // This code should, in theory, add it the date the blog was edited at, but unfortunately this does not work for now and as it is not required, it is left for future improvements!
    // const dateCreated = document.querySelector('.blog-date');
    // const currentDateTime = () => {
    //   const currentDate = new Date();
    //   const date = currentDate.toLocaleDateString('en-US', {
    //     day: 'numeric',
    //     month: 'numeric',
    //     year: 'numeric',
    //   });
    //   const time = currentDate.toLocaleTimeString('en-US', {
    //     hour: 'numeric',
    //     minute: 'numeric',
    //   });
    //   return {
    //     date,
    //     time,
    //   };
    // };
    // const { date, time } = currentDateTime();
    // const date_edited = `(edited on ${date}, ${time})`;

    if (title && content) {
      // Send a PUT request to update the blog content
      const response = await fetch(
        `/api/blogs/${updateBlogButton.dataset.blogId}`,
        {
          method: 'PUT',
          body: JSON.stringify({ title, content }),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.ok) {
        // Hide the update button and show the edit button
        updateBlogButton.classList.add('hidden');
        const editBlogButton = updateBlogButton.previousElementSibling;
        editBlogButton.classList.remove('hidden');

        // // This code should, in theory, add it the date the blog was edited at, but unfortunately this does not work for now and as it is not required, it is left for future improvements!
        // const blogDate = document.querySelector('.blog-date');
        // blogDate.textContent = '';
        // const dateTextNode = document.createTextNode(date_edited);
        // blogDate.appendChild(dateTextNode);
        // console.log(dateTextNode);

        // If successful, reload the page to see the updated blog
        location.reload();
      } else {
        const updateBlogWarning = document.querySelector('.updateBlogWarning');

        // Check if a warning message already exists
        const existingWarning = updateBlogWarning.querySelector('h6');
        if (existingWarning) {
          // Remove the existing warning message
          updateBlogWarning.removeChild(existingWarning);
        }

        // Create and append the new warning message
        const warningMessage = document.createElement('h6');
        warningMessage.textContent =
          'Oops! Something went wrong, please try again!';
        warningMessage.style.color = 'yellow';
        updateBlogWarning.appendChild(warningMessage);

        return;
      }
    } else {
      const updateBlogWarning = document.querySelector('.updateBlogWarning');

      // Check if a warning message already exists
      const existingWarning = updateBlogWarning.querySelector('h6');
      if (existingWarning) {
        // Remove the existing warning message
        updateBlogWarning.removeChild(existingWarning);
      }

      // Create and append the new warning message
      const warningMessage = document.createElement('h6');
      warningMessage.textContent = 'WARNING: Please fill in empty fields!';
      warningMessage.style.color = 'yellow';
      updateBlogWarning.appendChild(warningMessage);
    }
  });
});
