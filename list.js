// list.js (포스트 목록 화면용 JavaScript)
const apiUrl = "https://jsonplaceholder.typicode.com";

// 포스트 목록 표시
async function displayPosts() {
  // 포스트 데이터 가져오기
  try {
    const response = await fetch(`${apiUrl}/posts`);
    if (!response.ok) throw new Error("Failed to fetch posts");
    const posts = await response.json();

    const postList = document.getElementById("post-list");
    postList.innerHTML = ""; // 기존 목록 초기화
    posts.forEach((post) => {
      const li = document.createElement("li");
      li.textContent = post.title;
      li.dataset.postId = post.id;
      // 포스트 클릭 시 상세 페이지로 이동
      li.addEventListener("click", () => {
        window.location.href = `detail.html?postId=${post.id}`;
      });
      postList.appendChild(li);
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// 페이지 로드 시 포스트 목록 표시
displayPosts();