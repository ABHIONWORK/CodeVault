import { bookmarkIcon, box, fire, home, users, gear, shield } from "./Icons";

const menu = [
    {
        id: 1,
        name: 'Home',
        url: '/',
        icon: home
    },
    {
        id: 2,
        name: 'Team Library',
        url: '/workspace/library',
        icon: users
    },
    {
        id: 3,
        name: 'New Snippet',
        url: '/workspace/new-snippet',
        icon: box
    },
    {
        id: 4,
        name: 'Popular',
        url: '/popular',
        icon: fire
    },
    {
        id: 5,
        name: 'Bookmarks',
        url: '/bookmarks',
        icon: bookmarkIcon
    },
    {
        id: 6,
        name: 'Billing',
        url: '/workspace/billing',
        icon: gear
    },
    {
        id: 7,
        name: 'Audit Trails',
        url: '/workspace/audit',
        icon: shield
    }
]

export default menu