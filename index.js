const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21,
        isLiked: false
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4,
        isLiked: false
    },
        {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152,
        isLiked: false
    }
]


function createPost(post, index) {
  const postElement = document.createElement("section")

  postElement.innerHTML = `
          <div class="user-info">
            <img src="${post.avatar}" class="avatar" alt="User avatar">
            <div>
              <h1>${post.name}</h1>
              <p>${post.location}</p>
            </div>
          </div>
          <img src="${post.post}" class="post-image" alt="User post image">
          <div class="post-body">
            <div class="icons">
              <button onclick="likePost(${index})"><i class="fa-heart fa-regular"></i></button>
              <button><i class="fa-regular fa-comment"></i></button>
              <button><i class="fa-regular fa-paper-plane"></i></button>
            </div>
            <div class="like-count">${post.likes} likes</div>
            <div class="username-caption">
              <p><span>${post.username}</span> ${post.comment}</p>
            </div>
          </div>
  `;

  return postElement;
}

function renderAllPosts() {
  const main = document.querySelector("main");
  main.innerHTML = '';
  posts.forEach((post, index) => {
    main.appendChild(createPost(post, index))
  })
}


function likePost(index) {
  const post = posts[index]
  post.isLiked = !post.isLiked
  post.likes += post.isLiked ? +1 : -1;

  const postEl = document.querySelectorAll("section")[index];
  const likeBtn = postEl.querySelector(".fa-heart")
  const likesEl = postEl.querySelector(".like-count")

  likeBtn.classList.toggle('fa-solid');
  likesEl.textContent = `${post.likes} likes`
}

renderAllPosts();
