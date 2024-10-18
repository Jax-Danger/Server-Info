RegisterNetEvent('submitReportToDiscord', function(reportData, reportedby)
  local playerName = reportData.playerName
  local playerID = reportData.playerID
  local subject = reportData.subject
  local details = reportData.details
  local reportType = reportData.reportType
  local imageLink = reportData.imageLink
  local src = source

  local embed = {
    title = reportType.." Report",
    color = 65280 -- Green color
  }

  if reportType == "Player" then
    embed.description = createPlayerReportDescription(subject, playerName, details, reportedby)
  elseif reportType == "Bug" or reportType == "Error" or reportType == "Issue" then
    embed.description = createBugReportDescription(subject, details, reportedby)
    if imageLink and imageLink ~= "" then
      embed.image = { url = imageLink }
    end
  end

  local data = {
    embeds = {embed}
  }

  PerformHttpRequest(cfg.webhook, function(err, text, headers)
    -- Debugging: Print HTTP request response to server console
    print("HTTP Response: ", err, text)
  end, 'POST', json.encode(data), {['Content-Type'] = 'application/json'})
end)

function createPlayerReportDescription(subject, playerName, details, reportedby)
  return '## '..subject..'\n### Player: '..playerName..' has been reported for:\n  * '..details..'\n\nReport submitted by: ' .. reportedby
end

function createBugReportDescription(subject, details, reportedby)
  return '## '..subject..'\n### Details of Report:\n  * '..details..'\n\n * Report submitted by: ' .. reportedby
end