export default {
  routes: [
    {
      method: "POST",
      path: "/touch",
      handler: "touch.updateTimestamp",
      config: {
        // auth: true, // set to true later if you want auth
      },
    },
  ],
};
