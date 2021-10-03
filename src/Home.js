export default function Home({$app, initialState, onClick, addFavorite, io}) {
    this.state = initialState
    this.onClick = onClick
    this.addFavorite = addFavorite
    this.io = io
    this.$target = document.createElement('div')
    this.$target.className = 'home-container'
    $app.appendChild(this.$target)

    this.render = () => {
        const rankTemplate = this.state.rank.map((rank, index) => {
            return `
                <div class="rank">
                    <p>${index + 1} ${rank.title}</p>   
                    <br/>
                </div>
            `
        }).join('')

        const lifeCardTemplate = this.state.life.map((life) => {
            return `
                <div class="card-container">
                    <div class="card-action" data-url="${life.url}">
                        <img data-src="${life.imageUrl}" class="card-image"/>
                        <h5 class="card-title">${life.title}</h5>
                        <span class="card-content"">${life.summaryContent}</span>
                    </div>
                    <span class="card-medium">By ${life.mediaName}</span>
                    <span class="favorite" data-id="${life.idx}" data-category="life">
                    ★</span>
                </div>`
        }).join('')

        const foodCardTemplate = this.state.food.map((food) => {
            return `
                <div class="card-container">
                    <div class="card-action" data-url="${food.url}">
                        <img data-src="${food.imageUrl}" class="card-image"/>
                        <h5 class="card-title">${food.title}</h5>
                        <span class="card-content"">${food.summaryContent}</span>
                    </div>
                    <span class="card-medium">By ${food.mediaName}</span>
                    <span class="favorite" data-id="${food.idx}" data-category="food">
                    ★</span>
                </div>`
        }).join('')

        const travelCardTemplate = this.state.travel.map((travel) => {
            return `
                <div class="card-container">
                    <div class="card-action" data-url="${travel.url}">
                        <img data-src="${travel.imageUrl}" class="card-image"/>
                        <h5 class="card-title">${travel.title}</h5>
                        <span class="card-content"">${travel.summaryContent}</span>
                    </div>
                    <span class="card-medium">By ${travel.mediaName}</span>
                    <span class="favorite" data-id="${travel.idx}" data-category="travel">
                    ★</span>
                </div>`
        }).join('')

        const cultureCardTemplate = this.state.culture.map((culture) => {
            return `
                <div class="card-container">
                    <div class="card-action" data-url="${culture.url}">
                        <img data-src="${culture.imageUrl}" class="card-image"/>
                        <h5 class="card-title">${culture.title}</h5>
                        <span class="card-content"">${culture.summaryContent}</span>
                    </div>
                    <span class="card-medium">By ${culture.mediaName}</span>
                    <span class="favorite" data-id="${culture.idx}" data-category="culture">
                    ★</span>
                </div>`
        }).join('')

        this.$target.innerHTML = `
            <h1>홈</h1>
            <div class="rank-container">
                ${rankTemplate}
            </div>
            <div className="card-conatiner">
                ${lifeCardTemplate}
            </div>
            <div className="card-conatiner">
                ${foodCardTemplate}
            </div>
            </div>
            <div className="card-conatiner">
                ${travelCardTemplate}
            </div>
            <div className="card-conatiner">
                ${cultureCardTemplate}
            </div>
        `

        const images = document.querySelectorAll('.card-image');
        images.forEach((image) => {this.io.observe(image);})
    }

    this.$target.addEventListener('click', (e) => {
        const $card = e.target.closest('.card-action')
        if ($card) {
            const cardUrl = $card.dataset.url
            if (cardUrl) {
                this.onClick(cardUrl)
            }
        }
        if (!e.target.closest('.favorite')) {
            return
        }
        const $selected = e.target.closest('.favorite')
        const selectedId = $selected.dataset.id
        const category = $selected.dataset.category

        const selectedCard = this.state[category].find(culture => culture.idx === parseInt(selectedId))
        if (selectedCard) {
            this.addFavorite(selectedCard)
        }
    })

    this.render()
}
