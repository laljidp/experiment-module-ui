import { v4 as uuidv4 } from "uuid";
import {
  uniqueNamesGenerator,
  colors,
  animals,
  countries
} from "unique-names-generator";

export const generateUUID = () => uuidv4();

export const generateRandomName = (length) => {
  const name = uniqueNamesGenerator({
    dictionaries: [animals, colors, countries],
    length: length,
  });
  return name;
};
