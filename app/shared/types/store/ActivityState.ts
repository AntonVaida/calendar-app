import { ActivityType } from "../ActivityType";

export type ActivityState = {
  loading: boolean,
  error: Error | null,
  activityList: ActivityType[]
}