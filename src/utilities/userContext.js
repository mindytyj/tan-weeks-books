import { getUser } from "./users-service";
import { atom } from "jotai";

export const userAtom = atom(getUser());
