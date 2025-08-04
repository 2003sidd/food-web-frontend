import type dateType from "./JournalData.types";

export default interface JournalRequest extends dateType {
  userId: string;
}
