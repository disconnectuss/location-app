const getLoc = () => {
  const currentLoc: [number, number] = [39.340544, 35.310927];

  navigator.geolocation.getCurrentPosition(
    (params) => {
      console.log(params);
    },
    () => {
      console.log("default location updated successfully");
    }
  );

  return currentLoc;
};

export default getLoc;
