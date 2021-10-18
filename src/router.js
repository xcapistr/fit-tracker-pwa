import Router from 'svelte-easyroute'
import Content from './components/Content.svelte'
import Login from './components/Login.svelte'
import Table from './components/Table.svelte'
import EditValue from './components/EditValue.svelte'

const routes = [
  {
    path: '/',
    component: Content,
    name: 'Home',
    children: [
        {
            path: 'table',
            component: Table,
            name: 'Table',
            children: [
                {
                    path: 'edit/:date/:attr',
                    component: EditValue,
                    name: 'Edit'
                }
            ]
        }
    ]
  },
  {
    path: '/login',
    component: Login,
    name: 'Login'
  },
]

export const router = new Router({
  mode: 'history',
  routes,
})