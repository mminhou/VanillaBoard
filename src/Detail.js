export default function Detail({$app, initialState, addFavorite}) {
    this.state = initialState
    this.addFavorite = addFavorite
    this.$target = document.createElement('div')
    this.$target.className = 'detail-card-container'
    $app.appendChild(this.$target)

    this.render = () => {
        const detailTemplate = `
            <span>${this.state.category}</span>
            <h1>${this.state.title}</h1>
            <p>${this.state.medium}</p>
            <img src="${this.state.image}"/>
            <p>${this.state.content}</p>
            
            <nav class="nav">
            <a href="#" class="nav-item">홈</a>
            <a href="#life" class="nav-item">라이프</a>
            <a href="#food" class="nav-item">푸드</a>
            <a href="#travel" class="nav-item">여행</a>
            <a href="#culture" class="nav-item">컬처</a>
            <a href="#favorite" class="nav-item">즐겨찾기</a>
        </nav>
        `
        this.$target.innerHTML = `<div>${detailTemplate}</div>`
    }
    this.render()
}