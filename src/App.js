import {cultureRequest, foodRequest, lifeRequest, rankRequest, scrapRequest, travelRequest} from "./api";
import Home from "./Home.js";
import Life from "./Life.js";
import Food from "./Food";
import Travel from "./Travel";
import Culture from "./Culture";
import Detail from "./Detail";
import Loading from "./Loading";
import Favorite from "./Favorite";

const cache = {}

export default function App($app) {
    this.state = {
        isLoading: true,
        rankContent: [],
        lifeContent: [],
        foodContent: [],
        travelContent: [],
        cultureContent: [],
        selectedCardImage: [],
    }

    const routes = [
        {path: '', view: Home},
        {path: 'life', view: Life},
        {path: 'food', view: Food},
        {path: 'travel', view: Travel},
        {path: 'culture', view: Culture},
        {path: 'detail', view: Detail},
        {path: 'favorite', view: Favorite}
    ];

    window.onhashchange = () => {
        this.routes = routes;
        this.cur = window.location.hash.replace('#', '');
        const route = this.routes.find((route) => route.path === this.cur);
        const View = route.view;
        $app.innerHTML = ''
        localStorage.setItem('locationPath', View)
        if (View === Home) {
            new View({
                $app, initialState: {
                    rank: this.state.rankContent,
                    life: this.state.lifeContent.slice(0, 3),
                    food: this.state.foodContent.slice(0, 3),
                    travel: this.state.travelContent.slice(0, 3),
                    culture: this.state.cultureContent.slice(0, 3),
                },
                onClick: this.onClick
            });
        } else if (View === Life) {
            new View({$app, initialState: this.state.lifeContent, onClick: this.onClick});
        } else if (View === Food) {
            new View({$app, initialState: this.state.foodContent, onClick: this.onClick});
        } else if (View === Travel) {
            new View({$app, initialState: this.state.travelContent, onClick: this.onClick});
        } else if (View === Culture) {
            new View({$app, initialState: this.state.cultureContent, onClick: this.onClick, addFavorite: this.addFavorite});
        } else if (View === Detail) {
            new View({$app, initialState: this.state.selectedCardImage})
        } else if (View === Favorite) {
            new View({$app, onClick: this.onClick})
        }
    };

    // window.addEventListener('beforeunload', (event) => {
    //     event.preventDefault();
    //     console.log('#'+localStorage.getItem('locationPath'))
    //     const path = localStorage.getItem('locationPath')
    //     location.replace = '#'+path
    // });


    this.setState = (nextState) => {
        this.state = nextState
        loading.setState(this.state.isLoading)
    }

    const loading = new Loading({$app, initialState: this.state.isLoading})

    this.onClick = async (cardUrl) => {
        cardUrl = cardUrl.replace('https://hub.zum.com/', '').split('/')
        if (cache[cardUrl]) {
            this.setState({
                ...this.state,
                selectedCardImage: cache[cardUrl]
            })
        } else {
            this.setState({
                ...this.state,
                isLoading: true,
            })
            const scrap = await scrapRequest(cardUrl[0], cardUrl[1])
            this.setState({
                ...this.state,
                selectedCardImage: scrap
            })
            cache[cardUrl] = scrap
            this.setState({
                ...this.state,
                isLoading: false,
            })
        }
        location.href = '#detail'
    }

    this.addFavorite = async (card) => {
        let favorite = JSON.parse(localStorage.getItem('favorite'))
        if (favorite) {
            const favoriteInLocal = favorite.find(e => e.idx === card.idx)
            if (favoriteInLocal) {
                alert("이미 즐겨찾기 목록에 추가되어 있습니다. ")
                return
            } else {
                favorite.unshift(card)
            }
        } else {
            favorite = [card]
        }
        localStorage.setItem('favorite', JSON.stringify(favorite))
        alert("successful add favorite")
    }

    const init = async () => {
        try {
            this.setState({
                ...this.state,
                isLoading: true,
            })
            const Life = await lifeRequest()
            const Food = await foodRequest()
            const Travel = await travelRequest()
            const Culture = await cultureRequest()
            const Rank = await rankRequest()
            this.setState({
                ...this.state,
                lifeContent: Life,
                foodContent: Food,
                travelContent: Travel,
                cultureContent: Culture,
                rankContent: Rank,
            })
        } catch (e) {
            // error handling
        } finally {
            this.setState({
                ...this.state,
                isLoading: false
            })
        }
    }

    init()
}