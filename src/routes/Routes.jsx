import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Completed from "../pages/completed/Completed";
import Cancelled from "../pages/cancelled/Cancelled";
import Processing from "../pages/processing/Processing";
import AllOrder from "../pages/allOrder/list/AllOrder";
import AllOrderView from "../pages/allOrder/view/AllOrderView";
import UserList from "../pages/user/list/UserList";
import UserView from "../pages/user/view/UserView";
import UserEdit from "../pages/user/edit/UserEdit";
import UserAdd from "../pages/user/add/UserAdd";
import ServicePersonList from "../pages/servicePerson/list/ServicePersonList";
import ServicePersonView from "../pages/servicePerson/view/ServicePersonView";
import ServicePersonEdit from "../pages/servicePerson/edit/ServicePersonEdit";
import ServicePersonAdd from "../pages/servicePerson/add/ServicePersonAdd";
import BannerList from "../pages/banner/list/BannerList";
import BannerAdd from "../pages/banner/add/BannerAdd";
import BannerEdit from "../pages/banner/edit/BannerEdit";
import BannerView from "../pages/banner/view/BannerView";
import CategoryList from "../pages/category/list/CategoryList";
import CategoryAdd from "../pages/category/add/CategoryAdd";
import CategoryEdit from "../pages/category/edit/CategoryEdit";
import CategoryView from "../pages/category/view/CategoryView";
import PlanAdd from "../pages/plan/add/PlanAdd";
import PlanList from "../pages/plan/list/PlanList";
import PlanEdit from "../pages/plan/edit/PlanEdit";
import PlanView from "../pages/plan/view/PlanView";
import Transaction from "../pages/transaction/Transaction";
import ServicePerson from "../pages/reports/servicePerson/ServicePerson";
import CovidList from "../pages/covid/list/CovidList";
import CovidAdd from "../pages/covid/add/CovidAdd";
import CovidEdit from "../pages/covid/edit/CovidEdit";
import CovidView from "../pages/covid/view/CovidView";
import UserNotificationList from "../pages/notification/user/list/UserNotificationList";
import UserNotificationAdd from "../pages/notification/user/add/UserNotificationAdd";
import UserNotificationView from "../pages/notification/user/view/UserNotificationView";
import ServicePersonNotificationList from "../pages/notification/servicePerson/list/ServicePersonNotificationList";
import ServicePersonNotificationAdd from "../pages/notification/servicePerson/add/ServicePersonNotificationAdd";
import ServicePersonNotificationView from "../pages/notification/servicePerson/view/ServicePersonNotificationView";
import ScheduleNotificationList from "../pages/notification/schedule/list/ScheduleList";
import ScheduleNotificationAdd from "../pages/notification/schedule/add/ScheduleAdd";
import ScheduleNotificationView from "../pages/notification/schedule/view/ScheduleView";
import Profile from "../pages/profile/Profile";
import CategoryDelete from "../pages/category/delete/CategoryDelete";

const Routes = () => {
  const authData = () => {
    return localStorage.getItem("data");
  };

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (!authData() ? <Redirect to="/signin" /> : <Dashboard />)}
      />
      <Route
        exact
        path="/user/list"
        render={() => (!authData() ? <Redirect to="/signin" /> : <UserList />)}
      />
      <Route
        exact
        path="/user/details/:id"
        render={() => (!authData() ? <Redirect to="/signin" /> : <UserView />)}
      />
      <Route
        exact
        path="/user/edit/:id"
        render={() => (!authData() ? <Redirect to="/signin" /> : <UserEdit />)}
      />
      <Route
        exact
        path="/user/add"
        render={() => (!authData() ? <Redirect to="/signin" /> : <UserAdd />)}
      />
      <Route
        exact
        path="/servicePerson/list"
        render={() =>
          !authData() ? <Redirect to="/signin" /> : <ServicePersonList />
        }
      />
      <Route
        exact
        path="/servicePerson/details/:id"
        render={() =>
          !authData() ? <Redirect to="/signin" /> : <ServicePersonView />
        }
      />
      <Route
        exact
        path="/servicePerson/edit/:id"
        render={() =>
          !authData() ? <Redirect to="/signin" /> : <ServicePersonEdit />
        }
      />
      <Route
        exact
        path="/servicePerson/add"
        render={() =>
          !authData() ? <Redirect to="/signin" /> : <ServicePersonAdd />
        }
      />
      <Route
        exact
        path="/banner/list"
        render={() =>
          !authData() ? <Redirect to="/signin" /> : <BannerList />
        }
      />
      <Route
        exact
        path="/banner/details/:id"
        render={() =>
          !authData() ? <Redirect to="/signin" /> : <BannerView />
        }
      />
      <Route
        exact
        path="/banner/edit/:id"
        render={() =>
          !authData() ? <Redirect to="/signin" /> : <BannerEdit />
        }
      />
      <Route
        exact
        path="/banner/add"
        render={() => (!authData() ? <Redirect to="/signin" /> : <BannerAdd />)}
      />
      <Route
        exact
        path="/category/list"
        render={() =>
          !authData() ? <Redirect to="/signin" /> : <CategoryList />
        }
      />
      <Route
        exact
        path="/category/details/:id"
        render={() =>
          !authData() ? <Redirect to="/signin" /> : <CategoryView />
        }
      />
      <Route
        exact
        path="/category/edit/:id"
        render={() =>
          !authData() ? <Redirect to="/signin" /> : <CategoryEdit />
        }
      />
      <Route
        exact
        path="/category/delete/:id"
        render={() =>
          !authData() ? <Redirect to="/signin" /> : <CategoryDelete />
        }
      />
      <Route
        exact
        path="/category/add"
        render={() =>
          !authData() ? <Redirect to="/signin" /> : <CategoryAdd />
        }
      />
      <Route
        exact
        path="/plan/list"
        render={() => (!authData() ? <Redirect to="/signin" /> : <PlanList />)}
      />
      <Route
        exact
        path="/plan/details/:id"
        render={() => (!authData() ? <Redirect to="/signin" /> : <PlanView />)}
      />
      <Route
        exact
        path="/plan/edit/:id"
        render={() => (!authData() ? <Redirect to="/signin" /> : <PlanEdit />)}
      />
      <Route
        exact
        path="/plan/add"
        render={() => (!authData() ? <Redirect to="/signin" /> : <PlanAdd />)}
      />
      <Route
        exact
        path="/all"
        render={() => (!authData() ? <Redirect to="/signin" /> : <AllOrder />)}
      />
      <Route
        exact
        path="/all/details/:id"
        render={() =>
          !authData() ? <Redirect to="/signin" /> : <AllOrderView />
        }
      />
      <Route
        exact
        path="/processing"
        render={() =>
          !authData() ? <Redirect to="/signin" /> : <Processing />
        }
      />
      <Route
        exact
        path="/completed"
        render={() => (!authData() ? <Redirect to="/signin" /> : <Completed />)}
      />
      <Route
        exact
        path="/cancelled"
        render={() => (!authData() ? <Redirect to="/signin" /> : <Cancelled />)}
      />
      <Route
        exact
        path="/transaction"
        render={() =>
          !authData() ? <Redirect to="/signin" /> : <Transaction />
        }
      />
      <Route
        exact
        path="/report/ServicePerson"
        render={() =>
          !authData() ? <Redirect to="/signin" /> : <ServicePerson />
        }
      />
      <Route
        exact
        path="/covid/list"
        render={() => (!authData() ? <Redirect to="/signin" /> : <CovidList />)}
      />
      <Route
        exact
        path="/covid/details/:id"
        render={() => (!authData() ? <Redirect to="/signin" /> : <CovidView />)}
      />
      <Route
        exact
        path="/covid/edit/:id"
        render={() => (!authData() ? <Redirect to="/signin" /> : <CovidEdit />)}
      />
      <Route
        exact
        path="/covid/add"
        render={() => (!authData() ? <Redirect to="/signin" /> : <CovidAdd />)}
      />

      <Route
        exact
        path="/userNotification/list"
        render={() =>
          !authData() ? <Redirect to="/signin" /> : <UserNotificationList />
        }
      />
      <Route
        exact
        path="/userNotification/details/:id"
        render={() =>
          !authData() ? <Redirect to="/signin" /> : <UserNotificationView />
        }
      />
      <Route
        exact
        path="/userNotification/add"
        render={() =>
          !authData() ? <Redirect to="/signin" /> : <UserNotificationAdd />
        }
      />

      <Route
        exact
        path="/serviceNotification/list"
        render={() =>
          !authData() ? (
            <Redirect to="/signin" />
          ) : (
            <ServicePersonNotificationList />
          )
        }
      />
      <Route
        exact
        path="/serviceNotification/details/:id"
        render={() =>
          !authData() ? (
            <Redirect to="/signin" />
          ) : (
            <ServicePersonNotificationView />
          )
        }
      />
      <Route
        exact
        path="/serviceNotification/add"
        render={() =>
          !authData() ? (
            <Redirect to="/signin" />
          ) : (
            <ServicePersonNotificationAdd />
          )
        }
      />

      <Route
        exact
        path="/scheduleNotification/list"
        render={() =>
          !authData() ? <Redirect to="/signin" /> : <ScheduleNotificationList />
        }
      />
      <Route
        exact
        path="/scheduleNotification/details/:id"
        render={() =>
          !authData() ? <Redirect to="/signin" /> : <ScheduleNotificationView />
        }
      />
      <Route
        exact
        path="/scheduleNotification/add"
        render={() =>
          !authData() ? <Redirect to="/signin" /> : <ScheduleNotificationAdd />
        }
      />

      <Route
        exact
        path="/profile"
        render={() => (!authData() ? <Redirect to="/signin" /> : <Profile />)}
      />
    </Switch>
  );
};

export default Routes;
