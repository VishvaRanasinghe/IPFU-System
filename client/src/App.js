import "./App.css";
import Layout from "./layouts/layout";
import Layout2 from "./layouts/layout2";
import Layout3 from "./layouts/layout3";
import Layout4 from "./layouts/layout4";

import ShopDashboard from "./pages/ShopDashboard";
import ShopProductOfferings from "./pages/ShopProductOfferings";
import ShopDonations from "./pages/ShopDonations";
import ShopRedemptions from "./pages/ShopRedemptions";
import ShopDecisionAnalytics from "./pages/ShopDecisionAnalytics";

import DonorDashboard from "./pages/DonorDashboard";
import DonorDonateProducts from "./pages/DonorDonateProducts";
import DonorDonatePrograms from "./pages/DonorDonatePrograms";
import DonorDonationHistory from "./pages/DonorDonationHistory";

import RecipientDashboard from "./pages/RecipientDashboard";
import RecipientBrowseProducts from "./pages/RecipientBrowseProducts";

import ManagerDashboard from "./pages/ManagerDashboard";
import ManagerUsersDonors from "./pages/ManagerUsersDonors";
import ManagerUsersRecipients from "./pages/ManagerUsersRecipients";
import ManagerUsersManagers from "./pages/ManagerUsersManagers";
import ManagerShopsRequests from "./pages/ManagerShopsRequests";
import ManagerShopsApproved from "./pages/ManagerShopsApproved";
import ManagerDonationsPrograms from "./pages/ManagerDonationsPrograms";
import ManagerDecisionAnalytics from "./pages/ManagerDecisionAnalytics";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Payment from "./pages/Payment";
import ReceiverProfile from "./pages/ReceiverProfile";
import EditPassword from "./pages/EditPassword";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="shop-dashboard" element={<ShopDashboard />} />
            <Route
              path="shop-product-offerings"
              element={<ShopProductOfferings />}
            />
            <Route path="/shop-donations" element={<ShopDonations />} />
            <Route path="/shop-redemptions" element={<ShopRedemptions />} />
            <Route path="/shop-decision" element={<ShopDecisionAnalytics />} />
          </Route>

          <Route path="/" element={<Layout2 />}>
            <Route path="/donor-dashboard" element={<DonorDashboard />} />
            <Route
              path="/donor-donate-products"
              element={<DonorDonateProducts />}
            />
            <Route
              path="/donor-donate-programs"
              element={<DonorDonatePrograms />}
            />
            <Route
              path="/donor-donation-history"
              element={<DonorDonationHistory />}
            />
          </Route>
          <Route path="/checkout" element={<Payment />} />

          <Route path="/" element={<Layout3 />}>
            <Route
              path="/recipient-dashboard"
              element={<RecipientDashboard />}
            />
            <Route
              path="/recipient-browse-products"
              element={<RecipientBrowseProducts />}
            />
            <Route path="/recipient-profile" element={<ReceiverProfile />} />
            <Route path="/recipient-edit-password" element={<EditPassword />} />
          </Route>

          <Route path="/" element={<Layout4 />}>
            <Route path="/manager-dashboard" element={<ManagerDashboard />} />
            <Route
              path="/manager-users-donors"
              element={<ManagerUsersDonors />}
            />
            <Route
              path="/manager-users-recipients"
              element={<ManagerUsersRecipients />}
            />
            <Route
              path="/manager-users-managers"
              element={<ManagerUsersManagers />}
            />
            <Route
              path="/manager-shops-requests"
              element={<ManagerShopsRequests />}
            />
            <Route
              path="/manager-shops-approved"
              element={<ManagerShopsApproved />}
            />
            <Route
              path="/manager-donations-programs"
              element={<ManagerDonationsPrograms />}
            />
            <Route
              path="/manager-decision-analytics"
              element={<ManagerDecisionAnalytics />}
            />
          </Route>

          <Route path="/test" element={<Sidebar />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
