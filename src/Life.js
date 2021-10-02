export default function Life({$app, initialState, onClick}) {
    this.state = initialState
    this.onClick = onClick
    this.$target = document.createElement('div')
    this.$target.className = 'card-container'
    $app.appendChild(this.$target)

    this.render = () => {
        const cardTemplate = this.state.map((life) => {
            return `
                <div class="card" data-url="${life.url}">
                    <img src="${life.imageUrl}" class="card-image"/>
                    <h5 class="card-title">${life.title}</h5>
                    <span class="card-content"">${life.summaryContent}</span>
                    <span class="card-medium">${life.mediaName}</span>
                </div>`
        }).join('')


        this.$target.innerHTML = `
            <h1>라이프</h1>
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
