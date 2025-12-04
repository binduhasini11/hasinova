document.addEventListener("DOMContentLoaded", () => {
  const postsContainer = document.getElementById("posts-container");
  const noPostsMsg = document.getElementById("no-posts");

  fetch("posts/posts.json")
    .then(res => res.json())
    .then(posts => {
      if (!posts || posts.length === 0) {
        noPostsMsg.style.display = "block";
        return;
      }

      posts.forEach(post => {
        const article = document.createElement("article");
        article.innerHTML = `
          <img src="${post.thumbnail}" alt="${post.title}">
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <a href="${post.link}" class="read">Read ${post.category === 'Poem' ? 'Poem' : 'More'} →</a>
        `;
        postsContainer.appendChild(article);
      });
    })
    .catch(() => {
      noPostsMsg.style.display = "block";
    });
});
