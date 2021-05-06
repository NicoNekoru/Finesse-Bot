$PSScriptHome = [System.IO.FileInfo]::new($PSScriptRoot).Directory.FullName;
Set-Location $PSScriptRoot
Powershell.exe -ExecutionPolicy Bypass -File .\Stop.ps1
Set-Location $PSScriptHome;
Write-Host "[INFO] " -ForegroundColor Yellow -NoNewline; Write-Host "Saving last log in lastrun.log...";
Copy-Item "$PSScriptHome\logs\log.log" "$PSScriptHome\logs\lastrun.log" -ErrorVariable err; 
if (!$?){ Write-Host "[ERR!] " -ForegroundColor Red -NoNewline; Write-Host "Could not save logs in lastlog.log because: $($err.Exception.Message)"} 
else { Write-Host "[SUCCESS] " -ForegroundColor Green -NoNewline; Write-Host "Log saved in lastlog.log!"; }
Write-Host "[INFO] " -ForegroundColor Yellow -NoNewline; Write-Host "Dumping logs...";
try {
	Clear-Content "$PSScriptHome\logs\log.log"
	Write-Host "[SUCCESS] " -ForegroundColor Green -NoNewline; Write-Host "log.log has been emptied!";
} catch {
	Write-Host "[ERR!] " -ForegroundColor Red -NoNewline; Write-Host "Could not empty log.log because: $($_.Exception.Message)"
}
try {
	Clear-Content "$PSScriptHome\logs\error.log"
	Write-Host "[SUCCESS] " -ForegroundColor Green -NoNewline; Write-Host "error.log has been emptied!";
} catch {
	Write-Host "[ERR!] " -ForegroundColor Red -NoNewline; Write-Host "Could not empty error.log because: $($_.Exception.Message)"
}
Write-Host "[INFO] " -ForegroundColor Yellow -NoNewline; Write-Host "Starting bot with pm2...";
pm2 start "$PSScriptHome/src/main.js" -f -l "$PSScriptHome/logs/log.log" -e "$PSScriptHome/logs/error.log" 2>&1 | Set-Variable err;
if($err -join "`n" -match "stopped|errored")
{
	pm2 stop "main" -f 2>&1 >$null; 
	pm2 delete "main" -f 2>&1 >$null;
	return $(Write-Host "[ERR!] " -ForegroundColor Red -NoNewline; Write-Host "An error has occured in your node program or in pm2. See the logs folder for more information. Remember to run setup!");
}
else { return $(Write-Host "[SUCCESS] " -ForegroundColor Green -NoNewline; Write-Host "Started the bot with pm2!";) }