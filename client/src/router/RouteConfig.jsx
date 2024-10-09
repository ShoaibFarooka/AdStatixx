import Login from '../pages/common/Login/Login.jsx';
import Register from '../pages/common/Register/Register.jsx';
import ForgotPassword from '../pages/common/ForgotPassword/ForgotPassword.jsx';
import ResetPassword from '../pages/common/ResetPassword/ResetPassword.jsx';
import AuthenticatedRedirect from '../components/AuthenticatedRedirect/AuthenticatedRedirect.jsx';
import Redirect from '../pages/common/Redirect/Redirect.jsx';
import NotFound from '../pages/common/NotFound/NotFound.jsx';

const routes = [
  //user
  // { path: "/login", element: <AuthenticatedRedirect><UserLogin /></AuthenticatedRedirect>, protected: false, showSidebar: false },
  // { path: "/register", element: <AuthenticatedRedirect><Register /></AuthenticatedRedirect>, protected: false, showSidebar: false },
  // { path: "/forgot-password", element: <AuthenticatedRedirect><ForgetPassword /></AuthenticatedRedirect>, protected: false, showSidebar: false },
  // { path: "/reset-password", element: <AuthenticatedRedirect><ResetPassword /></AuthenticatedRedirect>, protected: false, showSidebar: false },
  // { path: "/billing", element: <Billing />, protected: true, showSidebar: true },
  // { path: "/plans", element: <Plans />, protected: true, showSidebar: true },
  // { path: "/success", element: <Success />, protected: true, showSidebar: false },
  // { path: "/settings", element: <Settings />, protected: true, showSidebar: true },
  // { path: "/", element: <Redirect />, protected: true, showSidebar: true },

  //company
  // { path: "/company/login", element: <AuthenticatedRedirect><StaffLogin /></AuthenticatedRedirect>, protected: false, showSidebar: false },
  // { path: "/company/forgot-password", element: <AuthenticatedRedirect><StaffForgetPassword /></AuthenticatedRedirect>, protected: false, showSidebar: false },
  // { path: "/company/reset-password", element: <AuthenticatedRedirect><StaffResetPassword /></AuthenticatedRedirect>, protected: false, showSidebar: false },
  // { path: "/company/common/users", element: <StaffUsers />, protected: true, showSidebar: true },
  // { path: "/company", element: <Redirect />, protected: true, showSidebar: true },

  //admin
  // { path: "/company/admin/dashboard", element: <AdminDashboard />, protected: true, showSidebar: true },
  // { path: "/company/admin/employees", element: <AdminEmployees />, protected: true, showSidebar: true },
  // { path: "/company/admin/products", element: <AdminProducts />, protected: true, showSidebar: true },
  // { path: "/company/admin/settings", element: <AdminSettings />, protected: true, showSidebar: true },

  //common
  { path: "/login", element: <AuthenticatedRedirect><Login /></AuthenticatedRedirect>, protected: false, showSidebar: false },
  { path: "/register", element: <AuthenticatedRedirect><Register /></AuthenticatedRedirect>, protected: false, showSidebar: false },
  { path: "/forgot-password", element: <AuthenticatedRedirect><ForgotPassword /></AuthenticatedRedirect>, protected: false, showSidebar: false },
  { path: "/reset-password", element: <AuthenticatedRedirect><ResetPassword /></AuthenticatedRedirect>, protected: false, showSidebar: false },
  { path: "*", element: <NotFound />, protected: false, showSidebar: false },
];

export default routes;