// events: [
//   {
//     id: "ghghgghfuvfr6jhiuytre456789ikngyuik",
//     title: "Cumpleaños del jefe",
//     start: moment().toDate(),
//     end: moment().add(2, "hours").toDate(),
//     notes: "comprar pastel",
//     user: {
//       _id: "123",
//       name: "YoYa",
//     },
//   },
// ],

export const types = {
  uiOpenModal: "[ui] Open modal",
  uiCloseModal: "[ui] Close modal",

  eventSetActive: "[event] Set Active",
  eventAddNew: "[event] Add New",
  eventClearActiveEvents: "[event] Clear New Active Events",
  eventUpdated: "[event] Updated",
  eventDeleted: "[event] Deleted",
  eventLoaded: "[event] Loaded",
  eventCleaning: "[event] Cleaning",

  authChecking: "[auth] Checking login state",
  authCheckingFinish: "[auth] Finish checking login state",
  authStartLogin: "[auth] Start login",
  authLogin: "[auth] Login",
  authStartRegister: "[auth] Start register",
  authStartTokenRenew: "[auth] Start token renew",
  authLogout: "[auth] Logout",
};
