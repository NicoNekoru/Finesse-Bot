Set-Location $PSScriptRoot
Write-Host "[INFO] " -ForegroundColor Yellow -NoNewline; Write-Host "Stopping main...";
pm2 stop "main" -f  2>&1 | Set-Variable err; if(!$?){return $(Write-Host "[ERR!] " -ForegroundColor Red -NoNewline; Write-Host "Unable to stop main in pm2 because $($err.CategoryInfo.TargetName)!")}
else { Write-Host "[SUCCESS] " -ForegroundColor Green -NoNewline; Write-Host "Main has been stopped!"; }
Write-Host "[INFO] " -ForegroundColor Yellow -NoNewline; Write-Host "Removing main...";
pm2 delete "main" -f  2>&1 | Set-Variable err; if(!$?){return $(Write-Host "[ERR!] " -ForegroundColor Red -NoNewline; Write-Host "Unable to stop main in pm2 because $($err.CategoryInfo.TargetName)!")}
else { Write-Host "[SUCCESS] " -ForegroundColor Green -NoNewline; Write-Host "Main has been removed!"; }
return $(Write-Host "[SUCCESS] " -ForegroundColor Green -NoNewline; Write-Host "Bot has been fully stopped!");