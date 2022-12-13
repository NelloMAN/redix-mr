export const mrQuery = {
    GetUsrWorkDay: `
        select 
            wrkdID, 
            date_format(wrkdDay, "%Y-%m-%d") as wrkdDay, 
            wrkdInfoID, 
            infoGrpID, 
            wrkdUsrID, 
            wrkdActivity, 
            wrkdActivityType, 
            wrkdActivityHour, 
            wrkdSqdID, 
            wrkdCdc 
        from work_day w 
            inner join info i on i.infoID = w.wrkdInfoID 
        where wrkdUsrID = ? and month(wrkdDay) = ? 
        order by wrkdDay asc
    `,
  
    GetUser: `
      SELECT usrID 
      FROM usr 
      where usrEmail = ? and usrPwd = ?
    `,
  
    AddTeam: `
    INSERT INTO teams_system.teams (name, league, isActive)
      VALUES (?, ?, true);
    `,
  
    UpdateTeamById: `
    UPDATE teams_system.teams
    SET name = ?,
        league = ?
    WHERE
      id = ?
    `,
  
    DeleteTeamById: `
    UPDATE teams_system.teams
    SET isActive = false
    WHERE
      id = ?
    `
  };