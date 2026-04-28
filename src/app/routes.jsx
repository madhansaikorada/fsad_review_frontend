import { createBrowserRouter } from "react-router";
import { SplashScreen } from "./pages/SplashScreen";
import { OverviewPage } from "./pages/OverviewPage";
import { OnboardingScreen } from "./pages/OnboardingScreen";
import { CityDetailsPage } from "./pages/CityDetailsPage";
import { LoginScreen } from "./pages/LoginScreen";
import { CitizenLayout } from "./layouts/CitizenLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { CitizenHome } from "./pages/citizen/CitizenHome";
import { CityServicesPage } from "./pages/citizen/CityServicesPage";
import { ServiceDetailPage } from "./pages/citizen/ServiceDetailPage";
import { ReportIssuePage } from "./pages/citizen/ReportIssuePage";
import { MyReportsPage } from "./pages/citizen/MyReportsPage";
import { FeedbackPage } from "./pages/citizen/FeedbackPage";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { ManageCityInfo } from "./pages/admin/ManageCityInfo";
import { UpdateServices } from "./pages/admin/UpdateServices";
import { InfrastructureMonitor } from "./pages/admin/InfrastructureMonitor";
import { ViewReports } from "./pages/admin/ViewReports";
import { ViewFeedback } from "./pages/admin/ViewFeedback";
export const router = createBrowserRouter([{
  path: "/",
  Component: SplashScreen
}, {
  path: "/onboarding",
  Component: OnboardingScreen
}, {
  path: "/city-details",
  Component: CityDetailsPage
}, {
  path: "/overview",
  Component: OverviewPage
}, {
  path: "/login",
  Component: LoginScreen
}, {
  path: "/citizen",
  Component: CitizenLayout,
  children: [{
    index: true,
    Component: CitizenHome
  }, {
    path: "services",
    Component: CityServicesPage
  }, {
    path: "services/:id",
    Component: ServiceDetailPage
  }, {
    path: "report",
    Component: ReportIssuePage
  }, {
    path: "my-reports",
    Component: MyReportsPage
  }, {
    path: "feedback",
    Component: FeedbackPage
  }]
}, {
  path: "/admin",
  Component: AdminLayout,
  children: [{
    index: true,
    Component: AdminDashboard
  }, {
    path: "city-info",
    Component: ManageCityInfo
  }, {
    path: "services",
    Component: UpdateServices
  }, {
    path: "infrastructure",
    Component: InfrastructureMonitor
  }, {
    path: "reports",
    Component: ViewReports
  }, {
    path: "feedback",
    Component: ViewFeedback
  }]
}]);
