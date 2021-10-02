export default function Loading({ $app, initialState }) {
    this.state = initialState
    this.$target = document.createElement('div')
    this.$target.className = "Loading Modal"
    $app.appendChild(this.$target)

    this.setState = (nextState) => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        this.$target.innerHTML = `<p>asdfsafd</p>`
        // this.$target.innerHTML = `<img src={`factory/`}/>`
        this.$target.style.display = this.state ? 'block' : 'none'
    }

    this.render()
}