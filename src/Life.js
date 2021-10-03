export default function Life({$app, initialState, onClick, addFavorite, io}) {
    this.state = initialState
    this.onClick = onClick
    this.addFavorite = addFavorite
    this.io = io
    this.$target = document.createElement('div')
    this.$target.className = 'page-container'
    $app.appendChild(this.$target)

    this.render = () => {
        const cardTemplate = this.state.map((life) => {
            return `
                <div class="card-container">
                    <div class="card-action" data-url="${life.url}">
                        <img data-src="${life.imageUrl}" class="card-image"/>
                        <h5 class="card-title">${life.title}</h5>
                        <span class="card-content"">${life.summaryContent}</span>
                    </div>
                    <span class="card-medium">By ${life.mediaName}</span>
                    <span class="favorite" data-id="${life.idx}" >
                    ★</span>
                </div>`
        }).join('')

        this.$target.innerHTML = `
            <h1>라이프</h1>
            ${cardTemplate}
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
        const selectedCard = this.state.find(culture => culture.idx === parseInt(selectedId))
        if (selectedCard) {
            this.addFavorite(selectedCard)
        }
    })

    this.render()
}
