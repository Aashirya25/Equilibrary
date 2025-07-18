// Our impact post system using localStorage
const postsKey = 'equilibrary_blog_posts';
const adminPassword = 'equilibrary2024'; // Change this password as needed

const blogPostsDiv = document.getElementById('blog-posts');
const showAdminBtn = document.getElementById('show-admin');
const adminLoginForm = document.getElementById('admin-login');
const addPostForm = document.getElementById('add-post-form');

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem(postsKey) || '[]');
    blogPostsDiv.innerHTML = posts.length === 0 ? '<p>No posts yet.</p>' :
        posts.map(post => `
      <article class="blog-post">
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <small>${post.date}</small>
      </article>
    `).join('');
}

showAdminBtn.onclick = () => {
    adminLoginForm.style.display = 'block';
    showAdminBtn.style.display = 'none';
};

adminLoginForm.onsubmit = function (e) {
    e.preventDefault();
    const pw = document.getElementById('admin-password').value;
    if (pw === adminPassword) {
        adminLoginForm.style.display = 'none';
        addPostForm.style.display = 'block';
    } else {
        alert('Incorrect password.');
    }
};

addPostForm.onsubmit = function (e) {
    e.preventDefault();
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const date = new Date().toLocaleString();
    const posts = JSON.parse(localStorage.getItem(postsKey) || '[]');
    posts.unshift({ title, content, date });
    localStorage.setItem(postsKey, JSON.stringify(posts));
    addPostForm.reset();
    addPostForm.style.display = 'none';
    showAdminBtn.style.display = 'block';
    loadPosts();
};

// Initial load
loadPosts(); 