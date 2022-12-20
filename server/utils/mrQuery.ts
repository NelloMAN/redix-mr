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
  
    GetUserInfo: `
      select 
        usrID, 
        usrEmail, 
        usrName, 
        max(month(wrkdDay)) as lastWorkedMonth 
      from usr u 
        left join work_day wd on wd.wrkdUsrID = u.usrID 
        where usrEmail = ? and usrPwd = ?
      group by usrID
    `,
  
    GetUserMonth: `
      select 
        usrID, 
        usrEmail, 
        usrName, 
        max(month(wrkdDay)) as lastMonth 
      from usr u 
        left join work_day wd on wd.wrkdUsrID = u.usrID 
      where usrID = ? 
      group by usrID
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