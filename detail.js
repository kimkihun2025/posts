// detail.js (포스트 상세 화면용 JavaScript)
const apiUrl = "https://jsonplaceholder.typicode.com";

// 포스트 상세 정보 표시
async function displayPostDetail() {
    try {
        // URL에서 postId 가져오기
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get("postId");
        if (!postId) throw new Error("No post ID provided");

        const cacheKey = `post_${postId}`;
        const cache = localStorage.getItem(cacheKey);
        let post = null;

        if (cache) {
            // localStorage에 저장된 데이터 파싱
            const { data, timestamp } = JSON.parse(cache);
            const now = Date.now();
            // 5분(300,000ms) 이내면 캐시 사용
            if (now - timestamp < 300000) {
                post = data;
                console.log("Post loaded from localStorage");
            }
        }

        if (!post) {
            // 캐시가 없거나 만료된 경우 API에서 가져옴
            const response = await fetch(`${apiUrl}/posts/${postId}`);
            if (!response.ok) throw new Error("Failed to fetch post detail");
            post = await response.json();
            // localStorage에 캐시 저장
            localStorage.setItem(
                cacheKey,
                JSON.stringify({ data: post, timestamp: Date.now() })
            );
            console.log("Post fetched from API");
        }

        renderPost(post);
    } catch (error) {
        console.error("Error:", error.message);
        document.getElementById("post-detail").innerHTML =
            "<p>Error loading post details</p>";
    }
}

// 포스트 렌더링 함수
function renderPost(post) {
    const postDetail = document.getElementById("post-detail");
    postDetail.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
    `;
}

// 페이지 로드 시 포스트 상세 정보 표시
displayPostDetail();