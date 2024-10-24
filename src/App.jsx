import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { SidebarProvider } from "@/contexts/SidebarContext";
import PageNotFound from "@/pages/PageNotFound";
import ErrorFallback from "./ui/ErrorFallback";
import AppLayout from "./ui/AppLayout";
import Login from "./pages/Login";
import User from "./pages/User";
import Campaign from "./pages/Campaign";
import Lecturer from "./pages/Lecturer";
import Donation from "./pages/Donation";
import CreateCampaign from "./pages/CreateCampaign";
import CampaignImages from "./pages/CampaignImages";
import UpdateCampaign from "./pages/UpdateCampaign";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorFallback />}>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route element={<AppLayout />} ErrorBoundary={ErrorFallback}>
        <Route path="/app/campaign" element={<Campaign />} />
        <Route path="/app/campaign/create" element={<CreateCampaign />} />
        <Route
          path="/app/campaign/edit/:campaignId"
          element={<UpdateCampaign />}
        />
        <Route
          path="/app/campaign/images/:campaignId"
          element={<CampaignImages />}
        />
        <Route path="/app/lecturer" element={<Lecturer />} />
        <Route path="/app/donation" element={<Donation />} />
        <Route path="/app/user" element={<User />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Route>,
  ),
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <SidebarProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            className: "max-w-lg py-4 px-6 bg-white text-slate-700 text-base",
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
          }}
        />
      </QueryClientProvider>
    </SidebarProvider>
  );
}

export default App;
