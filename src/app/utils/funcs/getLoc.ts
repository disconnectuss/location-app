const getLoc = (): Promise<[number, number]> => {
  return new Promise((resolve) => {
    const defaultLoc: [number, number] = [39.340544, 35.310927];
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLoc: [number, number] = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        resolve(currentLoc);
      },
      (error) => {
        console.error(
          "Error fetching geolocation, using default location:",
          error
        );
        resolve(defaultLoc);
      }
    );
  });
};
export default getLoc;
