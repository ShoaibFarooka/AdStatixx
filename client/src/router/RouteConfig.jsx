import Login from '../pages/common/Login/Login.jsx';
import Register from '../pages/common/Register/Register.jsx';
import ForgotPassword from '../pages/common/ForgotPassword/ForgotPassword.jsx';
import ResetPassword from '../pages/common/ResetPassword/ResetPassword.jsx';
import CompanyDashboard from '../pages/company/Dashboard/Dashboard.jsx';
import CompanyCampaigns from '../pages/company/Campaigns/Campaigns.jsx';
import AddCampaigns from '../pages/company/Campaigns/components/AddCampaign.jsx';
import Redirect from '../pages/common/Redirect/Redirect.jsx';
import NotFound from '../pages/common/NotFound/NotFound.jsx';
import Verify from '../pages/common/VerifyOTP/Verify.jsx';

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
  { path: "/company/dashboard", element: <CompanyDashboard />, protected: true, authRedirect: false, showSidebar: true },
  { path: "/company/campaigns", element: <CompanyCampaigns />, protected: true, authRedirect: false, showSidebar: true },
  { path: "/company/campaigns/edit-campaign", element: <AddCampaigns />, protected: true, authRedirect: false, showSidebar: true },
  { path: "/company/campaigns/add-campaign", element: <AddCampaigns />, protected: true, authRedirect: false, showSidebar: true },
  // { path: "/company", element: <Redirect />, protected: true, showSidebar: true },

  //admin
  // { path: "/company/admin/dashboard", element: <AdminDashboard />, protected: true, showSidebar: true },
  // { path: "/company/admin/employees", element: <AdminEmployees />, protected: true, showSidebar: true },
  // { path: "/company/admin/products", element: <AdminProducts />, protected: true, showSidebar: true },
  // { path: "/company/admin/settings", element: <AdminSettings />, protected: true, showSidebar: true },

  //common
  { path: "/", element: <Redirect />, protected: true, authRedirect: false, showSidebar: false },
  { path: "/login", element: <Login />, protected: false, authRedirect: true, showSidebar: false },
  { path: "/register", element: <Register />, protected: false, authRedirect: true, showSidebar: false },
  { path: "/verify-otp", element: <Verify />, protected: false, authRedirect: true, showSidebar: false },
  { path: "/forgot-password", element: <ForgotPassword />, protected: false, authRedirect: true, showSidebar: false },
  { path: "/reset-password", element: <ResetPassword />, protected: false, authRedirect: true, showSidebar: false },
  { path: "*", element: <NotFound />, protected: false, showSidebar: false },
];

export default routes;
