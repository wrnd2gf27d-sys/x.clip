const videos = [
    { id: 1, title: "How to Start Coding in 2026", channel: "Code Master", views: "1.2M views", time: "2 days ago", duration: "15:32", thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=640&h=360&fit=crop", avatar: "CM", likes: 45200, dislikes: 1200, description: "Complete guide to start coding in 2026.", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", category: "coding", comments: [{ author: "Sarah J.", text: "This is exactly what I needed!", time: "2 hours ago", likes: 234 }] },
    { id: 2, title: "10 Digital Products You Can Create", channel: "Digital Creator Pro", views: "856K views", time: "5 days ago", duration: "12:45", thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&h=360&fit=crop", avatar: "DC", likes: 32100, dislikes: 890, description: "Discover 10 digital products to sell online.", videoUrl: "https://www.w3schools.com/html/movie.mp4", category: "business", comments: [{ author: "Alex R.", text: "Already made 3 sales!", time: "1 day ago", likes: 89 }] },
    { id: 3, title: "Morning Routine of a Millionaire", channel: "Success Daily", views: "2.1M views", time: "1 week ago", duration: "18:20", thumbnail: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=640&h=360&fit=crop", avatar: "SD", likes: 67800, dislikes: 2100, description: "5 habits of millionaire entrepreneurs.", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", category: "lifestyle", comments: [{ author: "Lisa M.", text: "Changed my life!", time: "3 days ago", likes: 445 }] },
    { id: 4, title: "Build a Website in 1 Hour", channel: "Web Wiz", views: "3.4M views", time: "3 days ago", duration: "58:12", thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=640&h=360&fit=crop", avatar: "WW", likes: 89200, dislikes: 1500, description: "No coding required website builder guide.", videoUrl: "https://www.w3schools.com/html/movie.mp4", category: "tech", comments: [{ author: "Tom B.", text: "Built my site in 45 minutes!", time: "6 hours ago", likes: 312 }] },
    { id: 5, title: "AI Tools That Will Replace Your Job", channel: "Future Tech", views: "5.7M views", time: "2 weeks ago", duration: "22:15", thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=640&h=360&fit=crop", avatar: "FT", likes: 124000, dislikes: 3400, description: "AI tools you need to learn NOW.", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", category: "tech", comments: [{ author: "Nina P.", text: "Learning ChatGPT this weekend.", time: "1 day ago", likes: 567 }] },
    { id: 6, title: "Minimalist Home Office Setup", channel: "Desk Setup Daily", views: "967K views", time: "4 days ago", duration: "9:48", thumbnail: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=640&h=360&fit=crop", avatar: "DS", likes: 28900, dislikes: 670, description: "Clean workspace under $500.", videoUrl: "https://www.w3schools.com/html/movie.mp4", category: "lifestyle", comments: [{ author: "Chris W.", text: "Best $25 I ever spent.", time: "2 days ago", likes: 78 }] },
    { id: 7, title: "How I Make $10,000/Month from YouTube", channel: "Creator Economy", views: "1.8M views", time: "1 week ago", duration: "25:30", thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=640&h=360&fit=crop", avatar: "CE", likes: 54300, dislikes: 1800, description: "Full income breakdown revealed.", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", category: "finance", comments: [{ author: "Rachel S.", text: "The affiliate section was gold!", time: "3 days ago", likes: 189 }] },
    { id: 8, title: "Learn Python in 2 Hours", channel: "Code Master", views: "4.2M views", time: "3 weeks ago", duration: "2:15:00", thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=640&h=360&fit=crop", avatar: "CM", likes: 156000, dislikes: 4200, description: "Full Python course for beginners.", videoUrl: "https://www.w3schools.com/html/movie.mp4", category: "coding", comments: [{ author: "Kevin H.", text: "Best Python tutorial ever!", time: "1 week ago", likes: 892 }] }
];

let currentVideoId = null;
let currentVideoElement = null;
let isPlaying = false;
let isMuted = false;
let likedVideos = JSON.parse(localStorage.getItem('likedVideos') || '[]');
let dislikedVideos = JSON.parse(localStorage.getItem('dislikedVideos') || '[]');
let subscribedChannels = JSON.parse(localStorage.getItem('subscribedChannels') || '[]');
let savedVideos = JSON.parse(localStorage.getItem('savedVideos') || '[]');

function displayVideos(videoList) {
    const grid = document.getElementById('videoGrid');
    const noResults = document.getElementById('noResults');
    if (!grid) return;
    if (videoList.length === 0) {
        grid.innerHTML = '';
        if (noResults) noResults.style.display = 'block';
        return;
    }
    if (noResults) noResults.style.display = 'none';
    grid.innerHTML = '';
    videoList.forEach(video => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.onclick = () => openVideo(video.id);
        card.innerHTML = `<div class="thumbnail"><img src="${video.thumbnail}" alt="${video.title}" loading="lazy"><span class="duration">${video.duration}</span></div><div class="video-info"><div class="channel-avatar">${video.avatar}</div><div class="video-details"><div class="video-title">${video.title}</div><div class="video-meta">${video.channel} • ${video.views} • ${video.time}</div></div></div>`;
        grid.appendChild(card);
    });
}

function openVideo(videoId) {
    localStorage.setItem('currentVideo', videoId);
    window.location.href = 'watch.html';
}

function filterCategory(category) {
    document.querySelectorAll('.category-chip').forEach(chip => chip.classList.remove('active'));
    document.querySelectorAll('.sidebar-item').forEach(item => item.classList.remove('active'));
    if (category === 'all') displayVideos(videos);
    else if (category === 'trending') displayVideos([...videos].sort((a, b) => parseInt(b.views) - parseInt(a.views)));
    else if (category === 'liked') displayVideos(videos.filter(v => likedVideos.includes(v.id)));
    else if (category === 'subscriptions') displayVideos(videos.filter(v => subscribedChannels.includes(v.channel)));
    else displayVideos(videos.filter(v => v.category === category));
}

function searchVideos(query) {
    query = query.toLowerCase();
    displayVideos(videos.filter(v => v.title.toLowerCase().includes(query) || v.channel.toLowerCase().includes(query)));
}

function loadWatchPage() {
    const videoId = localStorage.getItem('currentVideo');
    if (!videoId) { window.location.href = 'index.html'; return; }
    const video = videos.find(v => v.id == videoId);
    if (!video) return;

    currentVideoId = video.id;
    document.title = video.title + " - X.Clip";
    document.getElementById('videoTitle').textContent = video.title;
    document.getElementById('videoViews').textContent = video.views;
    document.getElementById('videoTime').textContent = video.time;
    document.getElementById('likeCount').textContent = formatNumber(video.likes);
    document.getElementById('channelName').textContent = video.channel;
    document.getElementById('channelAvatar').textContent = video.avatar;
    document.getElementById('videoDescription').textContent = video.description;
    document.getElementById('commentCount').textContent = video.comments.length;

    // Set video source - THE KEY FIX!
    currentVideoElement = document.getElementById('mainVideo');
    document.getElementById('videoSource').src = video.videoUrl;
    currentVideoElement.load();

    // Video events
    currentVideoElement.addEventListener('timeupdate', updateProgress);
    currentVideoElement.addEventListener('loadedmetadata', () => {
        document.getElementById('totalTime').textContent = formatTime(currentVideoElement.duration);
    });
    currentVideoElement.addEventListener('ended', () => {
        isPlaying = false;
        document.getElementById('playPauseBtn').textContent = '▶';
        document.getElementById('playOverlay').style.display = 'flex';
    });

    if (likedVideos.includes(video.id)) document.getElementById('likeBtn').classList.add('liked');
    if (dislikedVideos.includes(video.id)) document.getElementById('dislikeBtn').classList.add('disliked');

    const subBtn = document.getElementById('subscribeBtn');
    if (subscribedChannels.includes(video.channel)) {
        subBtn.textContent = 'Subscribed';
        subBtn.classList.add('subscribed');
    }

    loadComments(video);
    loadRelatedVideos(video.id);
}

function playVideo() {
    if (!currentVideoElement) return;
    currentVideoElement.play();
    isPlaying = true;
    document.getElementById('playOverlay').style.display = 'none';
    document.getElementById('playPauseBtn').textContent = '⏸';
}

function togglePlay() {
    if (!currentVideoElement) return;
    if (isPlaying) {
        currentVideoElement.pause();
        isPlaying = false;
        document.getElementById('playPauseBtn').textContent = '▶';
        document.getElementById('playOverlay').style.display = 'flex';
    } else {
        playVideo();
    }
}

function toggleMute() {
    if (!currentVideoElement) return;
    isMuted = !isMuted;
    currentVideoElement.muted = isMuted;
    document.getElementById('muteBtn').textContent = isMuted ? '🔇' : '🔊';
}

function updateProgress() {
    if (!currentVideoElement) return;
    const progress = (currentVideoElement.currentTime / currentVideoElement.duration) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('currentTime').textContent = formatTime(currentVideoElement.currentTime);
}

function seekVideo(event) {
    if (!currentVideoElement) return;
    const rect = document.getElementById('progressBarContainer').getBoundingClientRect();
    const pos = (event.clientX - rect.left) / rect.width;
    currentVideoElement.currentTime = pos * currentVideoElement.duration;
}

function toggleFullscreen() {
    if (!currentVideoElement) return;
    if (currentVideoElement.requestFullscreen) currentVideoElement.requestFullscreen();
    else if (currentVideoElement.webkitRequestFullscreen) currentVideoElement.webkitRequestFullscreen();
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins + ':' + (secs < 10 ? '0' : '') + secs;
}

function toggleLike() {
    const btn = document.getElementById('likeBtn');
    const dislikeBtn = document.getElementById('dislikeBtn');
    const countEl = document.getElementById('likeCount');
    let count = parseInt(countEl.textContent.replace(/[KM]/g, '')) * 1000;

    if (btn.classList.contains('liked')) {
        btn.classList.remove('liked');
        likedVideos = likedVideos.filter(id => id !== currentVideoId);
        countEl.textContent = formatNumber(count - 1);
    } else {
        btn.classList.add('liked');
        likedVideos.push(currentVideoId);
        countEl.textContent = formatNumber(count + 1);
        if (dislikeBtn.classList.contains('disliked')) {
            dislikeBtn.classList.remove('disliked');
            dislikedVideos = dislikedVideos.filter(id => id !== currentVideoId);
        }
    }
    localStorage.setItem('likedVideos', JSON.stringify(likedVideos));
    showToast('Video liked!');
}

function toggleDislike() {
    const btn = document.getElementById('dislikeBtn');
    const likeBtn = document.getElementById('likeBtn');

    if (btn.classList.contains('disliked')) {
        btn.classList.remove('disliked');
        dislikedVideos = dislikedVideos.filter(id => id !== currentVideoId);
    } else {
        btn.classList.add('disliked');
        dislikedVideos.push(currentVideoId);
        if (likeBtn.classList.contains('liked')) {
            likeBtn.classList.remove('liked');
            likedVideos = likedVideos.filter(id => id !== currentVideoId);
            let count = parseInt(document.getElementById('likeCount').textContent.replace(/[KM]/g, '')) * 1000;
            document.getElementById('likeCount').textContent = formatNumber(count - 1);
        }
    }
    localStorage.setItem('dislikedVideos', JSON.stringify(dislikedVideos));
}

function toggleSubscribe() {
    const btn = document.getElementById('subscribeBtn');
    const channel = document.getElementById('channelName').textContent;

    if (btn.textContent === 'Subscribe') {
        btn.textContent = 'Subscribed';
        btn.classList.add('subscribed');
        subscribedChannels.push(channel);
        showToast('Subscribed to ' + channel);
    } else {
        btn.textContent = 'Subscribe';
        btn.classList.remove('subscribed');
        subscribedChannels = subscribedChannels.filter(c => c !== channel);
    }
    localStorage.setItem('subscribedChannels', JSON.stringify(subscribedChannels));
}

function shareVideo() {
    navigator.clipboard.writeText(window.location.href).then(() => showToast('Link copied!')).catch(() => showToast('Share: ' + window.location.href));
}

function saveVideo() {
    if (!savedVideos.includes(currentVideoId)) {
        savedVideos.push(currentVideoId);
        localStorage.setItem('savedVideos', JSON.stringify(savedVideos));
        showToast('Saved to Watch Later!');
    } else showToast('Already saved!');
}

function loadComments(video) {
    const container = document.getElementById('commentsList');
    container.innerHTML = '';
    video.comments.forEach(c => addCommentToDOM(c));
}

function handleComment(event) {
    if (event.key !== 'Enter') return;
    const input = document.getElementById('commentInput');
    const text = input.value.trim();
    if (!text) return;
    addCommentToDOM({ author: "You", text: text, time: "Just now", likes: 0 });
    input.value = '';
    document.getElementById('commentCount').textContent = parseInt(document.getElementById('commentCount').textContent) + 1;
    showToast('Comment posted!');
}

function addCommentToDOM(comment) {
    const el = document.createElement('div');
    el.className = 'comment';
    el.innerHTML = `<div class="channel-avatar">${comment.author.charAt(0)}</div><div class="comment-content"><div class="comment-author">${comment.author}<span class="comment-time">${comment.time}</span></div><div class="comment-text">${comment.text}</div><div class="comment-actions"><span>👍 ${formatNumber(comment.likes)}</span><span>👎</span><span>Reply</span></div></div>`;
    document.getElementById('commentsList').insertBefore(el, document.getElementById('commentsList').firstChild);
}

function loadRelatedVideos(currentId) {
    const container = document.getElementById('relatedVideos');
    container.innerHTML = '<h3>Up Next</h3>';
    videos.filter(v => v.id != currentId).forEach(v => {
        const el = document.createElement('div');
        el.className = 'related-video-card';
        el.onclick = () => openVideo(v.id);
        el.innerHTML = `<div class="thumbnail"><img src="${v.thumbnail}" alt="${v.title}"><span class="duration">${v.duration}</span></div><div class="video-details"><div class="video-title">${v.title}</div><div class="video-meta">${v.channel}</div><div class="video-meta">${v.views} • ${v.time}</div></div></div>`;
        container.appendChild(el);
    });
}

function dragOverHandler(event) { event.preventDefault(); document.getElementById('dropZone').classList.add('dragover'); }
function dropHandler(event) { event.preventDefault(); document.getElementById('dropZone').classList.remove('dragover'); if (event.dataTransfer.files.length > 0) handleFile(event.dataTransfer.files[0]); }
function handleFileSelect(event) { if (event.target.files.length > 0) handleFile(event.target.files[0]); }
function handleFile(file) {
    if (!file.type.startsWith('video/')) { showToast('Please select a video file!'); return; }
    document.getElementById('uploadPreview').style.display = 'block';
    document.getElementById('previewVideo').innerHTML = `<video src="${URL.createObjectURL(file)}" controls style="width:100%; height:100%; border-radius:12px;"></video>`;
    showToast('Video selected: ' + file.name);
}
function handleUpload(event) {
    event.preventDefault();
    const title = document.getElementById('videoTitle').value;
    const desc = document.getElementById('videoDesc').value;
    if (!title || !desc) { showToast('Please fill all fields!'); return; }
    if (!document.getElementById('termsCheck').checked) { showToast('Please agree to Terms!'); return; }
    const btn = document.getElementById('publishBtn');
    btn.disabled = true; btn.textContent = 'Publishing...';
    setTimeout(() => { showToast('Clip "' + title + '" published!'); setTimeout(() => window.location.href = 'index.html', 2000); }, 1500);
}

function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}
function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, 3000);
}

document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('videoGrid')) {
        displayVideos(videos);
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.addEventListener('input', (e) => searchVideos(e.target.value));
    }
    if (document.getElementById('videoPlayer')) loadWatchPage();
    const uploadForm = document.getElementById('uploadForm');
    if (uploadForm) uploadForm.addEventListener('submit', handleUpload);
});