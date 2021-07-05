import { useState, useEffect } from "react";
import personData from "./data/person-data.json";

const clone = (obj: any) => JSON.parse(JSON.stringify(obj));
const flattenDeepObject = (
  location: any,
  parent: string,
  finalLocation: any
) => {
  for (let key in location) {
    if (typeof location[key] === "object") {
      flattenDeepObject(location[key], parent + "_" + key, finalLocation);
    } else {
      finalLocation[parent + "_" + key] = location[key];
    }
  }
  return finalLocation;
};

const transformFlattenLocations = (locations: any[]):any[] => {
  let draftLocations: any[] = clone(locations);
  let newLocations: any[] = [];
  draftLocations.forEach((location) => {
    let flatObj = flattenDeepObject(location, "location", {});
    newLocations.push(flatObj);
  });
  console.log("newLocations", newLocations);
  return newLocations;
};

const App = () => {
  const [flattnedLocations, setFlattnedLocations] = useState({
    headers: [] as string[],
    data: [] as any[],
  });
  useEffect(() => {
    const draftFlattenedLocations: any[] = transformFlattenLocations(
      personData.results.map(({ location }) => location)
    );
    console.log(draftFlattenedLocations);
    setFlattnedLocations({ headers: [], data: draftFlattenedLocations as any });
  }, []);

  return <div className="App">
    <pre>{JSON.stringify(flattnedLocations)}</pre>
  </div>;
};

export default App;
