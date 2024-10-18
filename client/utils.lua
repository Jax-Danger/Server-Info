--- A simple wrapper around SendNUIMessage that you can use to
--- dispatch actions to the React frame.
---
---@param action string The action you wish to target
---@param data any The data you wish to send along with this action
function SendReactMessage(action, data)
  SendNUIMessage({action = action, data = data})
end

function toggleNuiFrame(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage("setVisible", shouldShow)
end

RegisterNUICallback("hideFrame", function(_, cb)
  toggleNuiFrame(false)
  print("Hide NUI frame")
  cb({})
end)

