import Router from 'svelte-easyroute'
import Content from './components/Content.svelte'
import Login from './components/Login.svelte'
import Table from './components/Table.svelte'
import EditValue from './components/EditValue.svelte'
import EditColumn from './components/EditColumn.svelte'
import EditRow from './components/EditRow.svelte'

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
                },
                {
                    path: 'add-row',
                    component: EditRow,
                    name: 'Add row'
                },
                {
                    path: 'edit-row/:date',
                    component: EditRow,
                    name: 'Edit row'
                },
                {
                    path: 'add-column',
                    component: EditColumn,
                    name: 'Add column'
                },
                {
                    path: 'edit-column/:attribute',
                    component: EditColumn,
                    name: 'Edit column'
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