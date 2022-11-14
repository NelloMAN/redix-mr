class WorkDay {

    constructor(
        public wrkdDay: Date,
        public wrkdInfoID: number,
        public wrkdActivity: string,
        public wrkdActivityHour: number,
        public wrkdSqdID: number,
        public wrkdActivityType: string,
        public wrkdCdc: string
      ) {}
}

export default WorkDay;