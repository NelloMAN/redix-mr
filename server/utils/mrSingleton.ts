import { IWorkDay } from "./interface/MRServerInterface";

export class mrSingleton {
    private static instance: mrSingleton;
    private lastSavedWD: IWorkDay [];
  
    private constructor() {
        this.lastSavedWD = []
    }
  
    static getInstance(): mrSingleton {
      if (!mrSingleton.instance) {
        mrSingleton.instance = new mrSingleton();
      }
  
      return mrSingleton.instance;
    }
  
    setLastSavedWD(wd: IWorkDay[]) {
      this.lastSavedWD = wd;
    }
  
    getLastSavedWD() {
      return this.lastSavedWD;
    }
  }
  