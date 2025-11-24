// 完整的本地数据
const localMoviesData = {
    netflix_movies: [
        {
            id: 1,
            name: "红色通缉令",
            type: "Netflix电影",
            year: "2021",
            remarks: "HD",
            description: "一名国际刑警发出红色通缉令后，一名顶尖的艺术品盗窃犯和一名世界级的骗子展开了一场横跨全球的冒险竞赛。",
            director: "罗森·马歇尔·瑟伯",
            actors: "道恩·强森, 瑞安·雷诺兹, 盖尔·加朵",
            area: "美国",
            language: "英语",
            rating: "6.3",
            duration: "118分钟"
        },
        {
            id: 2,
            name: "不要抬头",
            type: "Netflix电影", 
            year: "2021",
            remarks: "4K",
            description: "两位天文学家发现一颗彗星即将与地球相撞，他们必须警告漠不关心的人类这个即将到来的威胁。",
            director: "亚当·麦凯",
            actors: "莱昂纳多·迪卡普里奥, 詹妮弗·劳伦斯",
            area: "美国",
            language: "英语", 
            rating: "7.2",
            duration: "138分钟"
        },
        {
            id: 3,
            name: "灰影人",
            type: "Netflix电影",
            year: "2022", 
            remarks: "HD",
            description: "一名前中情局特工的代号为'灰影人'，他发现自己成为了前同事的追杀目标。",
            director: "安东尼·罗素, 乔·罗素",
            actors: "瑞恩·高斯林, 克里斯·埃文斯",
            area: "美国",
            language: "英语",
            rating: "6.5",
            duration: "122分钟"
        }
    ],
    netflix_series: [
        {
            id: 4,
            name: "怪奇物语",
            type: "Netflix自制剧",
            year: "2016",
            remarks: "4季",
            description: "一群年轻朋友目睹超自然力量和政府秘密，一个奇怪的小女孩帮助他们寻找答案。",
            director: "达菲兄弟",
            actors: "米莉·博比·布朗, 芬恩·伍法德",
            area: "美国",
            language: "英语",
            rating: "8.7",
            duration: "4季"
        },
        {
            id: 5,
            name: "巫师",
            type: "Netflix自制剧",
            year: "2019",
            remarks: "3季",
            description: "基于波兰作家安杰·萨普科夫斯基的奇幻小说系列，讲述猎魔人杰洛特的冒险故事。",
            director: "Various",
            actors: "亨利·卡维尔, 安亚·查洛特拉", 
            area: "美国/波兰",
            language: "英语",
            rating: "8.2",
            duration: "3季"
        },
        {
            id: 6,
            name: "鱿鱼游戏",
            type: "Netflix自制剧",
            year: "2021",
            remarks: "1季",
            description: "数百名经济困难的玩家接受邀请，参加一系列儿童游戏，赢家可获得巨额奖金。",
            director: "黄东赫",
            actors: "李政宰, 朴海秀",
            area: "韩国", 
            language: "韩语",
            rating: "8.0",
            duration: "1季"
        }
    ],
    popular_movies: [
        {
            id: 7,
            name: "阿凡达：水之道",
            type: "科幻电影",
            year: "2022",
            remarks: "IMAX",
            description: "杰克·萨利一家在潘多拉星球的全新冒险，探索神秘的海洋世界。",
            director: "詹姆斯·卡梅隆",
            actors: "萨姆·沃辛顿, 佐伊·索尔达娜",
            area: "美国",
            language: "英语",
            rating: "7.6",
            duration: "192分钟"
        }
    ],
    tv_series: [
        {
            id: 8,
            name: "权力的游戏",
            type: "电视剧",
            year: "2011", 
            remarks: "8季",
            description: "七个王国为争夺铁王座而展开的权力斗争史诗。",
            director: "Various",
            actors: "艾米莉亚·克拉克, 基特·哈灵顿",
            area: "美国",
            language: "英语",
            rating: "9.2",
            duration: "8季"
        }
    ]
};

// 全局变量
let currentMovies = [];
let currentCategory = 'netflix_movies';

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMovies();
    
    // 监听搜索输入
    document.getElementById('search-input').addEventListener('input', filterMovies);
    
    // 监听分类变化
    document.getElementById('category-select').addEventListener('change', function() {
        currentCategory = this.value;
        filterMovies();
    });
});

// 加载电影
function loadMovies() {
    currentMovies = localMoviesData[currentCategory] || [];
    renderMovieList(currentMovies);
    
    // 自动选择第一个电影
    if (currentMovies.length > 0) {
        setTimeout(() => {
            selectMovie(currentMovies[0].id);
        }, 100);
    }
}

// 筛选电影
function filterMovies() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
    
    let filteredMovies = localMoviesData[currentCategory] || [];
    
    if (searchTerm) {
        filteredMovies = filteredMovies.filter(movie => 
            movie.name.toLowerCase().includes(searchTerm) ||
            movie.description.toLowerCase().includes(searchTerm) ||
            movie.actors.toLowerCase().includes(searchTerm)
        );
    }
    
    currentMovies = filteredMovies;
    renderMovieList(filteredMovies);
    
    // 更新状态
    const statusEl = document.getElementById('list-status');
    if (searchTerm) {
        statusEl.textContent = `✅ 找到 ${filteredMovies.length} 个相关影片`;
        statusEl.className = 'status success';
    } else {
        statusEl.textContent = `✅ 显示 ${filteredMovies.length} 个影片`;
        statusEl.className = 'status info';
    }
}

// 重置视图
function resetView() {
    document.getElementById('search-input').value = '';
    document.getElementById('category-select').value = 'netflix_movies';
    currentCategory = 'netflix_movies';
    loadMovies();
}

// 选择电影
function selectMovie(movieId) {
    // 更新卡片选中状态
    document.querySelectorAll('.movie-card').forEach(card => {
        card.classList.remove('active');
    });
    
    const selectedCard = document.querySelector(`[data-movie-id="${movieId}"]`);
    if (selectedCard) {
        selectedCard.classList.add('active');
    }
    
    // 显示详情
    showMovieDetail(movieId);
}

// 渲染电影列表
function renderMovieList(movies) {
    const container = document.getElementById('movies-container');
    
    if (!movies || movies.length === 0) {
        container.innerHTML = '<div class="empty-state">没有找到相关影片</div>';
        return;
    }
    
    container.innerHTML = movies.map(movie => `
        <div class="movie-card" data-movie-id="${movie.id}" onclick="selectMovie(${movie.id})">
            <div class="card-poster" style="background: linear-gradient(45deg, #${getRandomColor()}, #${getRandomColor()})">
                🎬
            </div>
            <div class="card-title" title="${movie.name}">${movie.name}</div>
            <div class="card-meta">
                <div>${movie.type}</div>
                <div>⭐ ${movie.rating} • ${movie.year}</div>
            </div>
        </div>
    `).join('');
}

// 显示电影详情
function showMovieDetail(movieId) {
    const movie = currentMovies.find(m => m.id === movieId);
    if (!movie) return;
    
    const detailContent = document.getElementById('detail-content');
    
    detailContent.innerHTML = `
        <div class="movie-detail">
            <div class="detail-poster" style="background: linear-gradient(45deg, #${getRandomColor()}, #${getRandomColor()})">
                🎬
            </div>
            
            <div class="info-row">
                <div class="info-label">影片名称:</div>
                <div class="info-value" style="font-size: 1.1rem; font-weight: bold; color: #e50914;">${movie.name}</div>
            </div>
            
            <div class="info-row">
                <div class="info-label">类型:</div>
                <div class="info-value">${movie.type}</div>
            </div>
            
            <div class="info-row">
                <div class="info-label">年份:</div>
                <div class="info-value">${movie.year}</div>
            </div>
            
            <div class="info-row">
                <div class="info-label">评分:</div>
                <div class="info-value">⭐ ${movie.rating}/10</div>
            </div>
            
            <div class="info-row">
                <div class="info-label">时长:</div>
                <div class="info-value">${movie.duration}</div>
            </div>
            
            <div class="info-row">
                <div class="info-label">地区:</div>
                <div class="info-value">${movie.area}</div>
            </div>
            
            <div class="info-row">
                <div class="info-label">语言:</div>
                <div class="info-value">${movie.language}</div>
            </div>
            
            <div class="info-row">
                <div class="info-label">导演:</div>
                <div class="info-value">${movie.director}</div>
            </div>
            
            <div class="info-row">
                <div class="info-label">主演:</div>
                <div class="info-value">${movie.actors}</div>
            </div>
            
            <div class="info-row">
                <div class="info-label">备注:</div>
                <div class="info-value">${movie.remarks}</div>
            </div>
            
            <div class="description">
                <strong>剧情简介:</strong><br>
                ${movie.description}
            </div>
        </div>
    `;
}

// 生成随机颜色
function getRandomColor() {
    return Math.floor(Math.random()*16777215).toString(16);
}
