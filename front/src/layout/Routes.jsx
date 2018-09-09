import Home from '../routes/Home'
import Blockchain from '../routes/Blockchain'
import Sources from '../routes/Sources'
import Data from '../routes/Data'

const hashes = {
    paths: [
        {
            path: '/home',
            name: 'Implementation',
            icon: 'home',
            component: Home
        },
        {
            path: '/rego',
            name: 'ID Registration',
            icon: 'search',
            component: Data
        },
        // {
        //     path: '/app',
        //     name: 'Blockchain',
        //     icon: 'rocket',
        //     component: Blockchain
        // },
        {
            path: '/sources',
            name: 'Data Sources',
            icon: 'database',
            component: Sources
        },
    ],
    redirect: {path: '/', to: '/home', name: 'Home'}
}

export default hashes
