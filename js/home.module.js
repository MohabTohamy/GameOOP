import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js";


export class Home {

    constructor() {
        document.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", () => {
                this.changeActiveLink(link);

                // const category = link.getAttribute('data-category');
                const category = link.dataset.category;


                this.getGames(category)
            });
        });


        this.loading = document.querySelector('.loading')
        this.details = document.getElementById('details')
        this.games = document.getElementById('games')


        this.ui = new Ui()




        this.getGames("MMORPG")

    }


    changeActiveLink(link) {


        document.querySelector(".navbar-nav .active").classList.remove("active");
        link.classList.add("active");

    }

    async getGames(cat) {

        this.loading.classList.remove('d-none')
        const options = {
            method: 'get',
            headers: {
                'x-rapidapi-key': 'ca010214a3mshc01d9011e0d05fep135754jsn45b119f7760f',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
            },
        };

        const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${cat}`, options);
        const response = await api.json();
        this.loading.classList.add('d-none')


        this.ui.displayGames(response);
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', () => {

                this.details.classList.remove("d-none")
                this.games.classList.add("d-none")
                new Details(card.dataset.id);

            })
        })
    }
}

