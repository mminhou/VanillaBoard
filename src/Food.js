export default function Food({$app, initialState, onClick}) {
    this.state = initialState
    this.onClick = onClick
    this.$target = document.createElement('div')
    this.$target.className = 'card-container'
    $app.appendChild(this.$target)

    this.render = () => {
        const cardTemplate = this.state.map((food) => {
            return `
                <div class="card" data-url="${food.url}">
                    <img src="${food.imageUrl}" class="card-image"/>
                    <h5 class="card-title">${food.title}</h5>
                    <span class="card-content"">${food.summaryContent}</span>
                    <span class="card-medium">${food.mediaName}</span>
                </div>`
        }).join('')


        this.$target.innerHTML = `
            <h1>푸드</h1>
            ${cardTemplate}
        `
    }

    this.$target.addEventListener('click', (e)=>{
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
