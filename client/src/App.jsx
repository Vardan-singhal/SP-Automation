



import { AdminAuthProvider } from './admin/context/AdminAuthContext'
import AdminLogin from './admin/pages/AdminLogin'
import AdminLayout from './admin/components/AdminLayout'
import ProtectedRoute from './admin/components/ProtectedRoute'
import Dashboard from './admin/pages/Dashboard'
import TopBarManager from './admin/pages/TopBarManager'
import React from 'react'
import { createBrowserRouter, RouterProvider, Outlet, ScrollRestoration } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import TeamManager from './admin/pages/TeamManager'
import FooterManager from './admin/pages/FooterManager'
import ContactInfoManager from './admin/pages/ContactInfoManager'
import EnquiryManager from './admin/pages/EnquiryManager'
import TestimonialManager from './admin/pages/TestimonialManager'
import CategoryManager from './admin/pages/CategoryManager'
import ProductManager from './admin/pages/ProductManager'
import BlogManager from './admin/pages/BlogManager'
import NavbarManager from './admin/pages/NavbarManager'


import Home from './pages/Home/Home'
import Blogs from './pages/Blogs/Blogs'
import Blogdetails from './pages/Blogs/Blogdetails'
import Contact from './pages/Contact-Us/Contact'



import OurCompany from './pages/ourcompany/OurCompany'
import About from './pages/ourcompany/AboutPage'
import MissionVision from './pages/ourcompany/Mission-vision'
import SPAutomationFAQs from './pages/ourcompany/SPAutomationFAQs'
import OurTeam from './pages/ourcompany/OurTeam'
import WhyChoose from './pages/ourcompany/Whychoose'



import Services from './pages/ourservices/Services'
import SolarConsultancyServices from './pages/ourservices/Solarprojectconsultancy'
import SystemDesignEngineering from './pages/ourservices/Systemdesignengineering'
import RooftopSolarServices from './pages/ourservices/Rooftopsolarservice'
import EPC from './pages/ourservices/EPC'
import EnergyStorageIntegration from './pages/ourservices/Energystorageintegration'
import CustomSolarSolutions from './pages/ourservices/Customsolarsolutions'
import TurnkeySolutionsEnterprises from './pages/ourservices/Turnkeysolution'
import OperationsMaintenance from './pages/ourservices/Operationmaintenance'
import RemoteMonitoringAnalytics from './pages/ourservices/Remotemonitoringenergy'
import TechnicalSupportTraining from './pages/ourservices/Trainingtechnicalsupport'
import AllProducts from './pages/Products/Allproducts'
import DetailProduct from './pages/Products/Detailsproduct'




// import { AdminAuthProvider } from './admin/context/AdminAuthContext'
// import AdminLogin from './admin/pages/AdminLogin'
// import AdminLayout from './admin/components/AdminLayout'
// import ProtectedRoute from './admin/components/ProtectedRoute'
// import Dashboard from './admin/pages/Dashboard'
// import TopBarManager from './admin/pages/TopBarManager'

const Layout = () => {
  return (
    <>
      <ScrollRestoration />
      <Header />
      <Outlet /> {/* This is where child routes will render */}
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'blogs', element: <Blogs /> },
      { path: 'blog/:slug', element: <Blogdetails /> },
      { path: 'contact', element: <Contact /> },
      // Support both /product/:id (legacy/shortcut) and nested /products/product/:id
      { path: 'products/:id', element: <DetailProduct /> },
      {
        path: 'ourcompany',
        element: <OurCompany />,
        children: [
          { index: true, element: <About /> },
          { path: 'about', element: <About /> },
          { path: 'mission-vision', element: <MissionVision /> },
          { path: 'chooseus', element: <WhyChoose /> },
          { path: 'team', element: <OurTeam /> },
          { path: 'spautomationfaqs', element: <SPAutomationFAQs /> },
        ],
      },
      {
        path: 'ourservices',
        element: <Services />,
        children: [
          { index: true, element: <SolarConsultancyServices /> },
          { path: 'solar-consultancy-services', element: <SolarConsultancyServices /> },
          { path: 'system-design-engineering', element: <SystemDesignEngineering /> },
          { path: 'engineering-procurement-container', element: <EPC /> },
          { path: 'rooftop-solar-services', element: <RooftopSolarServices /> },
          { path: 'energy-storage-integration', element: <EnergyStorageIntegration /> },
          { path: 'custom-solar-solution', element: <CustomSolarSolutions /> },
          { path: 'turnkey-solution-for-enterprises', element: <TurnkeySolutionsEnterprises /> },
          { path: 'operation-maintenance', element: <OperationsMaintenance /> },
          { path: 'remote-monitoring-energy-analytics', element: <RemoteMonitoringAnalytics /> },
          { path: 'training-technical-support', element: <TechnicalSupportTraining /> },
         
        ],
      },
      {
        path: 'products',
        element: <AllProducts />,
        children: [
        { path: "products/:id", element: <DetailProduct />},
     
        ],
      },
    ],
  },
  {
    path: '/',
    element: <Layout />,
    children: [ /* ...your existing public routes unchanged... */ ],
  },
  { path: 'admin/login', element: <AdminLogin /> },
  {
    path: 'admin',
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'topbar', element: <TopBarManager /> },
          { path: 'team', element: <TeamManager /> },
          { path: 'footer', element: <FooterManager /> },
          { path: 'contact', element: <ContactInfoManager /> },
{ path: 'enquiries', element: <EnquiryManager /> },
{ path: 'testimonials', element: <TestimonialManager /> },
{ path: 'categories', element: <CategoryManager /> },
{ path: 'products', element: <ProductManager /> },
{ path: 'blogs', element: <BlogManager /> },
{ path: 'navbar', element: <NavbarManager /> },
        ],
      },
    ],
  },
])

function App() {
  return (
    <AdminAuthProvider>
      <RouterProvider router={router} />
    </AdminAuthProvider>
  )
}

export default App