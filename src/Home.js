export default function Home({$app, initialState, onClick}) {
    this.state = initialState
    this.onClick = onClick
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
                <div class="card" data-url="${life.url}">
                    <img src="${life.imageUrl}" class="card-image"/>
                    <h5 class="card-title">${life.title}</h5>
                    <span class="card-content"">${life.summaryContent}</span>
                    <span class="card-medium">${life.mediaName}</span>
                </div>`
        }).join('')

        const foodCardTemplate = this.state.food.map((food) => {
            return `
                <div class="card" data-url="${food.url}">
                    <img src="${food.imageUrl}" class="card-image"/>
                    <h5 class="card-title">${food.title}</h5>
                    <span class="card-content"">${food.summaryContent}</span>
                    <span class="card-medium">${food.mediaName}</span>
                </div>`
        }).join('')

        const travelCardTemplate = this.state.travel.map((travel) => {
            return `
                <div class="card" data-url="${travel.url}">
                    <img src="${travel.imageUrl}" class="card-image"/>
                    <h5 class="card-title">${travel.title}</h5>
                    <span class="card-content"">${travel.summaryContent}</span>
                    <span class="card-medium">${travel.mediaName}</span>
                </div>`
        }).join('')

        const cultureCardTemplate = this.state.culture.map((culture) => {
            return `
                <div class="card" data-url="${culture.url}">
                    <img src="${culture.imageUrl}" class="card-image"/>
                    <h5 class="card-title">${culture.title}</h5>
                    <span class="card-content"">${culture.summaryContent}</span>
                    <span class="card-medium">${culture.mediaName}</span>
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
    }

    this.$target.addEventListener('click', (e) => {
        const $card = e.target.closest('.card')
        if ($card) {
            const cardUrl = $card.dataset.url
            if (cardUrl) {
                this.onClick(cardUrl)
            }
        }
    })

    this.render()
}
