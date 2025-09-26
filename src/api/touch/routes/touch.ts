export default {
  routes: [
    {
      method: "POST",
      path: "/touch",
      handler: "touch.updateTimestamp",
      config: {},
    },
  ],
};
