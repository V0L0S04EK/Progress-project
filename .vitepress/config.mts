import { defineConfig } from 'vitepress'



export default defineConfig({

    lang: 'ru-RU',

    title: "Цифровая Стройка",

    description: "База знаний о нейросетях в строительстве",



    themeConfig: {


        docFooter: {

            prev: 'Предыдущая страница',

            next: 'Следующая страница'

        },

        outline: {

            label: 'На этой странице'

        },

        returnToTopLabel: 'Наверх',

        sidebarMenuLabel: 'Меню',

        darkModeSwitchLabel: 'Оформление',

        lastUpdatedText: 'Обновлено',


        search: {

            provider: 'local',

            options: {

                translations: {

                    button: { buttonText: 'Поиск' },

                    modal: {

                        noResultsText: 'Ничего не найдено',

                        resetButtonTitle: 'Сбросить поиск',

                        footer: { selectText: 'выбрать', navigateText: 'перейти', closeText: 'закрыть' }

                    }

                }

            }

        },



        nav: [

            { text: 'Главная', link: '/' },

            { text: 'Статьи', link: '/data/ai-construction-part1' }

        ],




        sidebar: [

            {

                text: 'Нейросети в строительстве',

                collapsed: false,

                items: [

                    { text: 'Часть 1: Проектирование', link: '/data/ai-construction-part1' },

                    { text: 'Часть 2: Площадка и контроль', link: '/data/ai-construction-part2' }

                ]

            }

        ],



        socialLinks: [

            { icon: 'github', link: 'https://github.com/' }

        ],



        footer: {

            message: 'Эпоха цифровой трансформации',

        }

    }

})