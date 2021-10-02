export default function Culture({$app, initialState, onClick, addFavorite}) {
    this.state = initialState
    this.onClick = onClick
    this.addFavorite = addFavorite
    this.$target = document.createElement('div')
    this.$target.className = 'card-container'
    $app.appendChild(this.$target)

    this.render = () => {
        const cardTemplate = this.state.map((culture) => {
            return `
                <div class="card" data-url="${culture.url}">
                    <img src="${culture.imageUrl}" class="card-image"/>
                    <h5 class="card-title">${culture.title}</h5>
                    <span class="card-content"">${culture.summaryContent}</span>
                    <span class="card-medium">${culture.mediaName}</span>
                </div>
                <span class="favorite" data-id="${culture.idx}"
                >★</span>
            `
        }).join('')

        this.$target.innerHTML = `
            <h1>컬처</h1>
            ${cardTemplate}
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
