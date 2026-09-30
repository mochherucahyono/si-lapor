import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../components/LandingPage.vue';
import AboutUs from '../components/AboutUs.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import FormPengaduan from '../components/FormPengaduan.vue';
import RiwayatPengaduan from '../components/RiwayatPengaduan.vue';
import Profile from '../components/Profile.vue';
import AdminLayout from '../components/admins/AdminLayout.vue';
import DashboardOverview from '../components/admins/DashboardOverview.vue';
import Statistik from '../components/Statistik.vue';
import Guide from '../components/information/Guide.vue';
import Contact from '../components/information/Contact.vue';

const routes = [{
        path: '/',
        name: 'Landing',
        component: LandingPage,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/about-us',
        name: 'AboutUs',
        component: AboutUs,
    },
    {
        path: '/statistic',
        name: 'Statistik',
        component: Statistik,
    },
    {
        path: '/guide',
        name: 'Guide',
        component: Guide,
    },
    {
        path: '/contact',
        name: 'Contact',
        component: Contact,
    },
    {
        path: '/pengaduan',
        name: 'FormPengaduan',
        component: FormPengaduan,
        meta: { requiresAuth: true },
    },

    {
        path: '/riwayat',
        name: 'RiwayatPengaduan',
        component: RiwayatPengaduan,
        meta: { requiresAuth: true },
    },
    {
        path: '/admin',
        name: 'Admin',
        component: AdminLayout,
        meta: { requiresAuth: true, requiresAdmin: true, hideNavbar: true },
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: { requiresAuth: true },
    },



];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Navigation Guard: Proteksi Auth & Role Admin
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (to.meta.requiresAuth && !token) {
        // Jika rute butuh auth tapi belum login -> arahkan ke /login
        return next('/login');
    }

    if (to.meta.requiresAdmin && user.role !== 'ADMIN') {
        // Jika rute butuh akses admin tapi user bukan admin -> kembalikan ke /riwayat
        return next('/riwayat');
    }

    if ((to.path === '/login' || to.path === '/register') && token) {
        // Jika sudah login tapi mencoba ke /login atau /register -> redirect sesuai role
        if (user.role === 'ADMIN') {
            return next('/admin');
        }
        return next('/pengaduan');
    }

    next();
});

export default router;