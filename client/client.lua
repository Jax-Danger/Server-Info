RegisterCommand("serverinfo", function()
  toggleNuiFrame(true)
  SendReactMessage('getServerInfo', {
    serverName = cfg.ServerName,
    subheader = cfg.subheader, 
    description = cfg.description, 
    footer = cfg.footer
  })
end)


RegisterNUICallback('submitReport', function(data, cb)
  local reportedby = GetPlayerName(PlayerId())
  TriggerServerEvent('submitReportToDiscord', data, reportedby)
end)

RegisterNUICallback('getDiscord', function(_, cb)
  cb(cfg.discord)
end)
