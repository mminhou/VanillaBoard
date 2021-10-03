export default function Culture({$app, initialState, onClick, addFavorite, io}) {
    this.state = initialState
    this.onClick = onClick
    this.addFavorite = addFavorite
    this.io = io
    this.$target = document.createElement('div')
    this.$target.className = 'page-container'
    $app.appendChild(this.$target)



    this.createTemplate = (id) => {
        return `
            <div class="card-container">
                <div class="card-action" data-url="${this.state[id].url}">
                    <img src="${this.state[id].imageUrl}" class="card-image"/>
                        <h5 class="card-title">${this.state[id].title}</h5>
                        <span class="card-content"">${this.state[id].summaryContent}</span>
                    </div>
                    <span class="card-medium">By ${this.state[id].mediaName}</span>
                    <span class="favorite" data-id="${this.state[id].idx}" >
                    ★</span>
                </div>\`
        `
    }

    this.render = () => {
        const cardTemplate = this.state.map((culture) => {
            return `
                <div class="card-container">
                    <div class="card-action" data-url="${culture.url}">
                        <img data-src="${culture.imageUrl}" class="card-image"/>
                        <h5 class="card-title">${culture.title}</h5>
                        <span class="card-content"">${culture.summaryContent}</span>
                    </div>
                    <span class="card-medium">By ${culture.mediaName}</span>
                    <span class="favorite" data-id="${culture.idx}" >
                    ★</span>
                </div>`
        }).join('')

        this.$target.innerHTML = `
            <h1>컬처</h1>
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
