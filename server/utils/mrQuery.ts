export const mrQuery = {
    GetUsrWorkDay: `
        select 
            wrkdID, 
            date_format(wrkdDay, "%Y-%m-%d") as wrkdDay, 
            wrkdInfoID, 
            infoGrpID as wrkdInfoGrpID, 
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
  
    GetUsrInfo: `
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

    SetTimeName: `SET lc_time_names = 'it_IT'`,

    GetSquad : `select sqdID, sqdName from squad`,

    GetUsrMonth: `
      select 
        distinct month(wrkdDay) as monthNumb, 
        monthname(wrkdDay) as monthName 
      from work_day 
      where wrkdUsrID = ?
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