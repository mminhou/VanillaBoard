export default function Food({$app, initialState, onClick, addFavorite, io}) {
    this.state = initialState
    this.onClick = onClick
    this.addFavorite = addFavorite
    this.io = io
    this.$target = document.createElement('div')
    this.$target.className = 'page-container'
    $app.appendChild(this.$target)

    this.render = () => {
        const cardTemplate = this.state.map((food) => {
            return `
                <div class="card-container">
                    <div class="card-action" data-url="${food.url}">
                        <img data-src="${food.imageUrl}" class="card-image"/>
                        <h5 class="card-title">${food.title}</h5>
                        <span class="card-content"">${food.summaryContent}</span>
                    </div>
                    <span class="card-medium">By ${food.mediaName}</span>
                    <span class="favorite" data-id="${food.idx}" >
                    ★</span>
                </div>`
        }).join('')


        this.$target.innerHTML = `
            <h1>푸드</h1>
            ${cardTemplate}
        `

        const images = document.querySelectorAll('.card-image');
        images.forEach((image) => {this.io.observe(image);})
    }

    this.$target.addEventListener('click', (e)=>{
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
        const selectedCard = this.state.find(culture => culture.idx === parseInt(selectedId))
        if (selectedCard) {
            this.addFavorite(selectedCard)
        }
    })

    this.render()
}
