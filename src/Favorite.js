export default function Favorite({$app, onClick}) {
    this.onClick = onClick
    this.state = JSON.parse(localStorage.getItem('favorite'))
    this.$target = document.createElement('div')
    this.$target.className = 'favorite-card-container'
    $app.appendChild(this.$target)

    this.render = () => {
        const cardTemplate = this.state.map((favorite) => {
            return `
                <div class="favorite-card" data-url="${favorite.url}">
                    <div class="favorite-card-image">
                        <img src="${favorite.imageUrl}" width="100%"/> 
                    </div>
                    <div class="favorite-card-content">
                        <h4 class=""">${favorite.title}</h5>
                        <p> ${favorite.summaryContent} </p>
                        <span class="">${favorite.mediaName} </span>
                    </div>
                </div>`
        }).join('')

        this.$target.innerHTML = `
            <h1>즐겨찾기</h1>
            ${cardTemplate}
        `
    }

    this.$target.addEventListener('click', (e)=>{
        const $card = e.target.closest('.favorite-card')
        if ($card) {
            const cardUrl = $card.dataset.url
            if (cardUrl) {
                this.onClick(cardUrl)
            }
        }
    })

    this.render()
}