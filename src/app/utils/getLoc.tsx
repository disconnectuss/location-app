const getLoc = () => {
  let currentLoc: [number, number] = [39.340544, 35.310927];

  navigator.geolocation.getCurrentPosition(
    (params) => {
      currentLoc = [params.coords.latitude, params.coords.longitude];
    },
    () => {
      console.log("Default location updated successfully");
    }
  );

  return currentLoc;
};

export default getLoc;
