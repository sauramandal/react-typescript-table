import { useState, useEffect } from "react";
import personData from "./data/person-data.json";

type Person = any;
type Location = {
  location_city: { header: string; value: string };
  location_coordinates_latitude: { header: string; value: string };
  location_coordinates_longitude: { header: string; value: string };
  location_country: { header: string; value: string };
  location_postcode: { header: string; value: number };
  location_state: { header: string; value: string };
  location_street_name: { header: string; value: string };
  location_street_number: { header: string; value: number };
  location_timezone_description: {
    header: string;
    value: string;
  };
  location_timezone_offset: { header: string; value: string };
};
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
      finalLocation[parent + "_" + key] = { header: key, value: location[key] };
    }
  }
  return finalLocation;
};

const transformFlattenLocations = (locations: any[]): any[] => {
  let draftLocations: any[] = clone(locations);
  let newLocations: any[] = [];
  draftLocations.forEach((location) => {
    let flatObj = flattenDeepObject(location, "location", {});
    newLocations.push(flatObj);
  });
  // console.log("newLocations", newLocations);
  return newLocations;
};

const App = () => {
  const [flattnedLocations, setFlattnedLocations] = useState<any[]>([]);
  useEffect(() => {
    const draftFlattenedLocations: any[] = transformFlattenLocations(
      personData.results.map(({ location }) => location)
    );
    setFlattnedLocations(draftFlattenedLocations as any);
  }, []);

  return (
    <div className="App">
      <table className="table">
        <thead>
          <tr>
            {flattnedLocations[0] &&
              Object.keys(flattnedLocations[0] as Location[]).map(
                (location: string, idx: number) => (
                  <th key={idx}>{flattnedLocations[0][location]["header"]}</th>
                )
              )}
          </tr>
        </thead>
        <tbody>
          {flattnedLocations &&
            flattnedLocations.map((item: any, itemIndex: number) => (
              <tr key={itemIndex}>
                {item &&
                  Object.keys(item).map((key: string, keyIdx: number) => (
                    <td key={keyIdx}>{item[key]["value"]}</td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
      {/* <pre>{JSON.stringify(flattnedLocations)}</pre> */}
    </div>
  );
};

export default App;
