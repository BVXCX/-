// دالة لنسخ النص
function copyCode(elementId) {
    const element = document.getElementById(elementId);
    const range = document.createRange();
    range.selectNode(element);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    
    alert('تم نسخ الكود بنجاح!');
}

// دالة لتوليد ID فريد
function generateId() {
    return Date.now().toString();
}

// معالجة إرسال النموذج
if (document.getElementById('story-form')) {
    document.getElementById('story-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const storyData = {
            id: generateId(),
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            genre: document.getElementById('genre').value,
            content: document.getElementById('content').value,
            storyImage: document.getElementById('story-image').value 
                ? `images/stories/${document.getElementById('story-image').value}`
                : '',
            authorImage: document.getElementById('author-image').value 
                ? `images/authors/${document.getElementById('author-image').value}`
                : ''
        };
        
        // إنشاء كود JSON
        const fullStoryCode = JSON.stringify(storyData, null, 2);
        const addressCode = JSON.stringify({
            id: storyData.id,
            title: storyData.title,
            author: storyData.author,
            genre: storyData.genre
        }, null, 2);
        
        // عرض الأكواد
        document.getElementById('full-story-code').textContent = fullStoryCode;
        document.getElementById('addresses-code').textContent = addressCode;
        document.getElementById('output').classList.remove('hidden');
        
        // مسح النموذج
        this.reset();
    });
}

// عرض القصص في صفحة العرض
if (document.getElementById('stories-list')) {
    // هذه الدالة ستجلب القصص من الخادم في التطبيق الحقيقي
    // هنا نستخدم بيانات تجريبية للتوضيح
    function loadStories() {
        // في التطبيق الحقيقي، ستكون هذه استجابة من الخادم
        const stories = [
            {
                id: '1',
                title: 'قصة تجريبية',
                author: 'مؤلف تجريبي',
                genre: 'نوع تجريبي',
                content: 'هذا محتوى تجريبي للقصة...',
                storyImage: 'images/stories/story1.jpg',
                authorImage: 'images/authors/author1.jpg'
            }
        ];
        
        const storiesList = document.getElementById('stories-list');
        storiesList.innerHTML = '';
        
        stories.forEach(story => {
            const storyElement = document.createElement('div');
            storyElement.className = 'story-item';
            storyElement.innerHTML = `
                <h3>${story.title}</h3>
                <p>الكاتب: ${story.author}</p>
                <p>النوع: ${story.genre}</p>
            `;
            
            storyElement.addEventListener('click', () => showStoryDetails(story));
            storiesList.appendChild(storyElement);
        });
    }
    
    function showStoryDetails(story) {
        document.getElementById('stories-list').classList.add('hidden');
        document.getElementById('story-details').classList.remove('hidden');
        
        document.getElementById('detail-title').textContent = story.title;
        document.getElementById('detail-author').textContent = story.author;
        document.getElementById('detail-genre').textContent = story.genre;
        document.getElementById('detail-content').textContent = story.content;
        
        document.getElementById('detail-code').textContent = JSON.stringify(story, null, 2);
    }
    
    function hideDetails() {
        document.getElementById('story-details').classList.add('hidden');
        document.getElementById('stories-list').classList.remove('hidden');
    }
    
    // تحميل القصص عند فتح الصفحة
    loadStories();
}
