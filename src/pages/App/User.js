import { getUser } from "../../utilities/users-service";
import { atom, useAtomValue } from "jotai";

export const userAtom = atom(getUser());
