export default function Travel({$app, initialState, onClick}) {
    this.state = initialState
    this.onClick = onClick
    this.$target = document.createElement('div')
    this.$target.className = 'card-container'
    $app.appendChild(this.$target)

    this.render = () => {
        const cardTemplate = this.state.map((travel) => {
            return `
                <div class="card" data-url="${travel.url}">
                    <img src="${travel.imageUrl}" class="card-image"/>
                    <h5 class="card-title">${travel.title}</h5>
                    <span class="card-content"">${travel.summaryContent}</span>
                    <span class="card-medium">${travel.mediaName}</span>
                </div>`
        }).join('')


        this.$target.innerHTML = `
            <h1>여행</h1>
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
    })

    this.render()
}
