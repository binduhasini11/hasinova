document.addEventListener("DOMContentLoaded", () => {
  const latestContainer = document.getElementById("latestPosts");
  const techContainer = document.getElementById("techPosts");
  const poemContainer = document.getElementById("poemPosts");

  fetch("assets/data/posts.json")
    .then(res => res.json())
    .then(posts => {
      if (!posts || posts.length === 0) return;

      // Sort by date (latest first)
      posts.sort((a, b) => new Date(b.date) - new Date(a.date));

      posts.forEach(post => {
        const postCard = document.createElement("div");
        postCard.classList.add("post-card");
        postCard.innerHTML = `
          <img src="${post.thumbnail}" alt="${post.title}">
          <h3><a href="${post.link}">${post.title}</a></h3>
          <p>${post.excerpt}</p>
        `;

        // Latest section
        if (latestContainer) latestContainer.appendChild(postCard.cloneNode(true));

        // Tech page
        if (techContainer && post.category === "Tech") {
          techContainer.appendChild(postCard.cloneNode(true));
        }

        // Poems page
        if (poemContainer && post.category === "Poem") {
          poemContainer.appendChild(postCard.cloneNode(true));
        }
      });
    })
    .catch(err => {
      console.error("Error loading posts:", err);
    });
});
