import { makeAutoObservable, makeObservable, runInAction } from "mobx";
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
    try {
      const activities = await agents.Activities.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        this.activityRegistry.set(activity.id, activity);
      });
      this.setLoadingInitital(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitital(false);
    }
  };

  loadActivityDetails = async (selectedId: string) => {
    this.selectedActivity = this.activityRegistry.get(selectedId);
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
        if (this.selectedActivity?.id === deletingId) {
          this.cancelSelectedActivity();
        }
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };

  cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  openForm = (id?: string) => {
    id ? this.loadActivityDetails(id) : this.cancelSelectedActivity();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };
}

export default ActivityStore;
