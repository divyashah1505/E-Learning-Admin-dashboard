// import React, { useState, useEffect } from 'react';
// import { Route, Switch, Redirect } from "react-router-dom";
// import { Routes } from "../routes";

// // pages
// // import Presentation from "./Presentation";
// import Upgrade from "./Upgrade";
// import DashboardOverview from "./dashboard/DashboardOverview";
// // import Settings from "./Settings";
// import UploadRecipe from './UploadRecipe';
// import ManageCombos from "./tables/ManageCombos";
// import ManagePlans from "./tables/ManagePlans";
// import Signin from "./examples/Signin";
// import Signup from "./examples/Signup";
// import ForgotPassword from "./examples/ForgotPassword";
// import ResetPassword from "./examples/ResetPassword";
// import Lock from "./examples/Lock";
// import NotFoundPage from "./examples/NotFound";
// import ServerError from "./examples/ServerError";

// // documentation pages
// import DocsOverview from "./documentation/DocsOverview";
// import DocsDownload from "./documentation/DocsDownload";
// import DocsQuickStart from "./documentation/DocsQuickStart";
// import DocsLicense from "./documentation/DocsLicense";
// import DocsFolderStructure from "./documentation/DocsFolderStructure";
// import DocsBuild from "./documentation/DocsBuild";
// import DocsChangelog from "./documentation/DocsChangelog";

// // components
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// // import Footer from "../components/Footer";
// import Preloader from "../components/Preloader";

// import Accordion from "./components/Accordion";
// import Alerts from "./components/Alerts";
// import Badges from "./components/Badges";
// import Breadcrumbs from "./components/Breadcrumbs";
// import Buttons from "./components/Buttons";
// import Forms from "./components/Forms";
// import Modals from "./components/Modals";
// import Navs from "./components/Navs";
// import Navbars from "./components/Navbars";
// import Pagination from "./components/Pagination";
// import Popovers from "./components/Popovers";
// import Progress from "./components/Progress";
// import Tables from "./components/Tables";
// import Tabs from "./components/Tabs";
// import Tooltips from "./components/Tooltips";
// import Toasts from "./components/Toasts";
// import AddCategory from '../pages/tables/AddCategory';
// import AddSubCategory from '../pages/tables/AddSubCategory';
// import ViewRecipeDetails from '../pages/tables/ViewRecipeDetails';
// import CategoryInfo from '../pages/tables/CategoryInfo'
// import ViewRecipes from './tables/ViewRecipes';
// import AddRecipe from './tables/AddRecipe';
// import CustomersTable from './CustomersTable';


// const RouteWithLoader = ({ component: Component, ...rest }) => {
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoaded(true), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
//   );
// };

// const RouteWithSidebar = ({ component: Component, ...rest }) => {
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoaded(true), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   // const localStorageIsSettingsVisible = () => {
//   //   return localStorage.getItem('settingsVisible') === 'false' ? false : true
//   // }

//   // const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

//   // const toggleSettings = () => {
//   //   setShowSettings(!showSettings);
//   //   localStorage.setItem('settingsVisible', !showSettings);
//   // }

//   return (
//     <Route {...rest} render={props => (
//       <>
//         <Preloader show={loaded ? false : true} />
//         <Sidebar />

//         <main className="content">
//           <Navbar />
//           <Component {...props} />
//           {/* <Footer toggleSettings={toggleSettings} showSettings={showSettings} /> */}

//         </main>
//       </>
//     )}
//     />
//   );
// };

// export default () => (
//   <Switch>
//     {/* <RouteWithLoader exact path={Routes.Presentation.path} component={Presentation} /> */}
//     <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
//     <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
//     <RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
//     <RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword} />
//     <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
//     <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
//     <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />

//     {/* pages */}
//     <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
//     <RouteWithSidebar exact path={Routes.Upgrade.path} component={Upgrade} />
//     <RouteWithSidebar exact path={Routes.Customers.path} component={CustomersTable} />
//     <RouteWithSidebar exact path={Routes.AddCategory.path} component={AddCategory} />
//     <RouteWithSidebar exact path={Routes.AddSubCategory.path} component={AddSubCategory} />
//     <RouteWithSidebar exact path={Routes.AddRecipe.path} component={AddRecipe} />
//     <RouteWithSidebar exact path={Routes.ViewRecipe.path} component={ViewRecipes} />
//     <RouteWithSidebar exact path={Routes.ViewRecipeDetails.path} component={ViewRecipeDetails} />
//     <RouteWithSidebar exact path={Routes.CategoryInfo.path} component={CategoryInfo} />
//     <RouteWithSidebar exact path={Routes.UploadRecipe.path} component={UploadRecipe} />
//     <RouteWithSidebar exact path={Routes.ManageCombos.path} component={ManageCombos} />
//     <RouteWithSidebar exact path={Routes.ManagePlans.path} component={ManagePlans} />


//     {/* components */}
//     <RouteWithSidebar exact path={Routes.Accordions.path} component={Accordion} />
//     <RouteWithSidebar exact path={Routes.Alerts.path} component={Alerts} />
//     <RouteWithSidebar exact path={Routes.Badges.path} component={Badges} />
//     <RouteWithSidebar exact path={Routes.Breadcrumbs.path} component={Breadcrumbs} />
//     <RouteWithSidebar exact path={Routes.Buttons.path} component={Buttons} />
//     <RouteWithSidebar exact path={Routes.Forms.path} component={Forms} />
//     <RouteWithSidebar exact path={Routes.Modals.path} component={Modals} />
//     <RouteWithSidebar exact path={Routes.Navs.path} component={Navs} />
//     <RouteWithSidebar exact path={Routes.Navbars.path} component={Navbars} />
//     <RouteWithSidebar exact path={Routes.Pagination.path} component={Pagination} />
//     <RouteWithSidebar exact path={Routes.Popovers.path} component={Popovers} />
//     <RouteWithSidebar exact path={Routes.Progress.path} component={Progress} />
//     <RouteWithSidebar exact path={Routes.Tables.path} component={Tables} />
//     <RouteWithSidebar exact path={Routes.Tabs.path} component={Tabs} />
//     <RouteWithSidebar exact path={Routes.Tooltips.path} component={Tooltips} />
//     <RouteWithSidebar exact path={Routes.Toasts.path} component={Toasts} />

//     {/* documentation */}
//     <RouteWithSidebar exact path={Routes.DocsOverview.path} component={DocsOverview} />
//     <RouteWithSidebar exact path={Routes.DocsDownload.path} component={DocsDownload} />
//     <RouteWithSidebar exact path={Routes.DocsQuickStart.path} component={DocsQuickStart} />
//     <RouteWithSidebar exact path={Routes.DocsLicense.path} component={DocsLicense} />
//     <RouteWithSidebar exact path={Routes.DocsFolderStructure.path} component={DocsFolderStructure} />
//     <RouteWithSidebar exact path={Routes.DocsBuild.path} component={DocsBuild} />
//     <RouteWithSidebar exact path={Routes.DocsChangelog.path} component={DocsChangelog} />

//     <Redirect to={Routes.NotFound.path} />
//   </Switch>
// );
import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import { Routes as AppRoutes } from "../routes";

// Pages
import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
import UploadRecipe from './UploadRecipe';
import ManageCombos from "./tables/ManageCombos";
import ManagePlans from "./tables/ManagePlans";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

// Documentation Pages
import DocsOverview from "./documentation/DocsOverview";
import DocsDownload from "./documentation/DocsDownload";
import DocsQuickStart from "./documentation/DocsQuickStart";
import DocsLicense from "./documentation/DocsLicense";
import DocsFolderStructure from "./documentation/DocsFolderStructure";
import DocsBuild from "./documentation/DocsBuild";
import DocsChangelog from "./documentation/DocsChangelog";

// Components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Preloader from "../components/Preloader";
import AddCategory from '../pages/tables/AddCategory';
import AddSubCategory from '../pages/tables/AddSubCategory';
import ViewRecipeDetails from '../pages/tables/ViewRecipeDetails';
import CategoryInfo from '../pages/tables/CategoryInfo'
import ViewRecipes from './tables/ViewRecipes';
import AddRecipe from './tables/AddRecipe';
import CustomersTable from './CustomersTable';

const RouteWithLoader = ({ element }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader show={!loaded} />
      {element}
    </>
  );
};

const RouteWithSidebar = ({ element }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader show={!loaded} />
      <Sidebar />
      <main className="content">
        <Navbar />
        {element}
      </main>
    </>
  );
};

export default function AppRoutesConfig() {
  return (
    <Routes>
      <Route path={AppRoutes.Signin.path} element={<RouteWithLoader element={<Signin />} />} />
      <Route path={AppRoutes.Signup.path} element={<RouteWithLoader element={<Signup />} />} />
      <Route path={AppRoutes.ForgotPassword.path} element={<RouteWithLoader element={<ForgotPassword />} />} />
      <Route path={AppRoutes.ResetPassword.path} element={<RouteWithLoader element={<ResetPassword />} />} />
      <Route path={AppRoutes.Lock.path} element={<RouteWithLoader element={<Lock />} />} />
      <Route path={AppRoutes.NotFound.path} element={<RouteWithLoader element={<NotFoundPage />} />} />
      <Route path={AppRoutes.ServerError.path} element={<RouteWithLoader element={<ServerError />} />} />

      {/* Pages */}
      <Route path={AppRoutes.DashboardOverview.path} element={<RouteWithSidebar element={<DashboardOverview />} />} />
      <Route path={AppRoutes.Upgrade.path} element={<RouteWithSidebar element={<Upgrade />} />} />
      <Route path={AppRoutes.Customers.path} element={<RouteWithSidebar element={<CustomersTable />} />} />
      <Route path={AppRoutes.AddCategory.path} element={<RouteWithSidebar element={<AddCategory />} />} />
      <Route path={AppRoutes.AddSubCategory.path} element={<RouteWithSidebar element={<AddSubCategory />} />} />
      <Route path={AppRoutes.AddRecipe.path} element={<RouteWithSidebar element={<AddRecipe />} />} />
      <Route path={AppRoutes.ViewRecipe.path} element={<RouteWithSidebar element={<ViewRecipes />} />} />
      <Route path={AppRoutes.ViewRecipeDetails.path} element={<RouteWithSidebar element={<ViewRecipeDetails />} />} />
      <Route path={AppRoutes.CategoryInfo.path} element={<RouteWithSidebar element={<CategoryInfo />} />} />
      <Route path={AppRoutes.UploadRecipe.path} element={<RouteWithSidebar element={<UploadRecipe />} />} />
      <Route path={AppRoutes.ManageCombos.path} element={<RouteWithSidebar element={<ManageCombos />} />} />
      <Route path={AppRoutes.ManagePlans.path} element={<RouteWithSidebar element={<ManagePlans />} />} />

      {/* Documentation */}
      <Route path={AppRoutes.DocsOverview.path} element={<RouteWithSidebar element={<DocsOverview />} />} />
      <Route path={AppRoutes.DocsDownload.path} element={<RouteWithSidebar element={<DocsDownload />} />} />
      <Route path={AppRoutes.DocsQuickStart.path} element={<RouteWithSidebar element={<DocsQuickStart />} />} />
      <Route path={AppRoutes.DocsLicense.path} element={<RouteWithSidebar element={<DocsLicense />} />} />
      <Route path={AppRoutes.DocsFolderStructure.path} element={<RouteWithSidebar element={<DocsFolderStructure />} />} />
      <Route path={AppRoutes.DocsBuild.path} element={<RouteWithSidebar element={<DocsBuild />} />} />
      <Route path={AppRoutes.DocsChangelog.path} element={<RouteWithSidebar element={<DocsChangelog />} />} />

      <Route path="*" element={<Navigate to={AppRoutes.NotFound.path} />} />
    </Routes>
  );
}
