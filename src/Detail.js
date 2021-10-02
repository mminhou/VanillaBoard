export default function Detail({$app, initialState}) {
    this.state = initialState
    this.$target = document.createElement('div')
    this.$target.className = 'detail-card-container'
    $app.appendChild(this.$target)

    this.render = () => {
        const detailTemplate = `
            <span>${this.state.category}</span>
            <h1>${this.state.title}</h1>
            <p>${this.state.medium}</p>
            <img src="${this.state.image}"/>
            <p>${this.state.content}</p>
        `
        this.$target.innerHTML = `<div>${detailTemplate}</div>`
    }
    this.render()
}