import { makeAutoObservable, runInAction } from "mobx";
import agents from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid";

class ActivityStore {
  // activities: Activity[] = [];
  //***
  // It is recommended to use JS maps instead of arrays as they are more powerful
  // Arrays methods like filter and spread operator make the syntax complex
  // ***
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode: boolean = false;
  loadingInitial: boolean = true;
  loading: boolean = false;

  setLoadingInitital = (value: boolean) => {
    this.loadingInitial = value;
  };

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  constructor() {
    makeAutoObservable(this);
  }

  // LOADING ACTIVITIES FROM THE API
  loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agents.Activities.list();
      activities.forEach((activity) => {
        this.setActivity(activity);
      });
      this.setLoadingInitital(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitital(false);
    }
  };

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.selectedActivity = activity;
    } else {
      this.loadingInitial = true;
      try {
        activity = await agents.Activities.details(id);
        this.setActivity(activity);
        this.selectedActivity = activity;
        this.setLoadingInitital(false);
      } catch (err) {
        console.log(err);
        this.setLoadingInitital(false);
      }
    }
  };

  private setActivity = (activity: Activity) => {
    activity.date = activity.date.split("T")[0];
    this.activityRegistry.set(activity.id, activity);
  };

  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  createActivity = async (activity: Activity) => {
    this.loading = true;
    activity.id = uuid();
    try {
      await agents.Activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agents.Activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteActivity = async (deletingId: string) => {
    this.loading = true;
    try {
      await agents.Activities.delete(deletingId);
      runInAction(() => {
        this.activityRegistry.delete(deletingId);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };
}

export default ActivityStore;
