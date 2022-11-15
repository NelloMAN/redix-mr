class User {

    constructor(
        public usrEmail : string,
        public usrName : string,
        public selectedMonth: number
      ) {

        usrEmail = "";
        usrName = "";
        selectedMonth = 0;
      }
}

export default User;