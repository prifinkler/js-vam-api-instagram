const url = "https://api.vam.ac.uk/v2/objects/search?q=queen&page_size=50"
let artPosts = [];

const fetchArtData = async () => {

  try {
    const res = await axios.get(url);
    const results = res.data.records;

    const arts = await Promise.all(results.map(async (item) => {
      const image_url = `https://framemark.vam.ac.uk/collections/${item._primaryImageId}/square/full/0/default.jpg`;
      const description_url = `https://iiif.vam.ac.uk/collections/${item.systemNumber}/manifest.json`;

      try {
        const descriptionResponse = await axios.get(description_url);
        const descriptionData = descriptionResponse.data.description

        return {
          id: item.systemNumber,
          maker: formatName(item._primaryMaker?.name) || 'Unknown',
          location: item._primaryPlace || 'Unknown',
          post: image_url,
          description: descriptionData,
          likes: Math.floor(Math.random() * 1000),
          isLiked: false
        };
      } catch (error) {
        console.error(`Error fetching description for item: ${item.systemNumber}`, error);
        return null;
      }
    }));

    artPosts = arts.filter(art => art !== null);
    return artPosts
  } catch (error) {
    console.error("Error fetching data:", error)
    return [];
  }
};

function formatName(name) {
  const nameParts = name.split(', ');
  const formattedName = nameParts.length > 1 ? `${nameParts[1]} ${nameParts[0]}` : name
  return formattedName
}


function createPost(post, index) {
  const postElement = document.createElement("section")

  postElement.innerHTML = `
      <div class="user-info">
        <img src="${post.post}" class="avatar" alt="User avatar">
        <div>
          <h1>${post.maker}</h1>
          <p>${post.location}</p>
        </div>
      </div>
      <img src="${post.post}" class="post-image" alt="User post image">
      <div class="post-body">
        <div class="icons">
          <button onclick="likePost(${index})" type="button" aria-label="like button"><i class="fa-heart fa-regular"></i></button>
          <button type="button" aria-label="comment button"><i class="fa-regular fa-comment"></i></button>
          <button type="button" aria-label="forward button"><i class="fa-regular fa-paper-plane"></i></button>
        </div>
        <div class="like-count">${post.likes} likes</div>
        <div class="username-caption">
          <p><span>${post.maker}</span> ${post.description}</p>
        </div>
      </div>
    `;

  return postElement;
}

async function renderAllPosts() {
  const main = document.querySelector("main");
  main.innerHTML = '<p>Loading...</p>';

  await fetchArtData();

  main.innerHTML ='';
  artPosts.forEach((post, index) => {
    main.appendChild(createPost(post, index))
  })
}

function likePost(index) {
  const post = artPosts[index]
  post.isLiked = !post.isLiked
  post.likes += post.isLiked ? +1 : -1;

  const postEl = document.querySelectorAll("section")[index];
  const likeBtn = postEl.querySelector(".fa-heart")
  const likesEl = postEl.querySelector(".like-count")

  likeBtn.classList.toggle('fa-solid');
  likesEl.textContent = `${post.likes} likes`
}

window.onload = renderAllPosts;
