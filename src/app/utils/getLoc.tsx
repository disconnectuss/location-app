const getLoc = (): Promise<[number, number]> => {
  return new Promise((resolve, reject) => {
    let currentLoc: [number, number] = [39.340544, 35.310927];
    navigator.geolocation.getCurrentPosition(
      (position) => {
        currentLoc = [position.coords.latitude, position.coords.longitude];
        resolve(currentLoc);
      },
      (error) => {
        console.error(
          "Error fetching geolocation, using default location:",
          error
        );
        resolve(currentLoc);
      }
    );
  });
};
export default getLoc;
