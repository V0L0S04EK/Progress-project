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
            },

            { text: 'Архитектор и дизайнер', link: '/data/ai-construction-part3' },
            { text: 'Инженер-проектировщик (BIM-менеджер)', link: '/data/ai-construction-part4' },
            { text: 'Руководитель проекта', link: '/data/ai-construction-part5' },
            { text: 'Инженер-сметчик / Специалист ПТО', link: '/data/ai-construction-part6' },
            { text: 'Инженер по охране труда и технике безопасности (ОТ и ТБ)', link: '/data/ai-construction-part7' },
            { text: 'Специалист по закупкам и логистике (Снабженец)', link: '/data/ai-construction-part8' },
            { text: 'Геодезист / Оператор строительных дронов', link: '/data/ai-construction-part9' },
            { text: 'Прораб / Начальник участка', link: '/data/ai-construction-part10' },
            { text: 'Инженер по качеству (Технадзор / Строительный контроль)', link: '/data/ai-construction-part11' },
            { text: 'Специалист по работе с клиентами / Риелтор новостроек', link: '/data/ai-construction-part12' },
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/' }
        ],

        footer: {
            message: 'Эпоха цифровой трансформации',
        }
    }
})