$PSScriptHome = [System.IO.FileInfo]::new($PSScriptRoot).Directory.FullName
Set-Location $PSScriptHome
Write-Host "[INFO] " -ForegroundColor Yellow -NoNewline; Write-Host "installing node modules..."
npm i 2>&1 | Set-Variable err
if ([regex]::Match($err -join "","npm ERR!.*?\nnpm ERR!.*?\n","12").success)
{
	$err = ([regex]::Match($err -join "","npm ERR!.*?\nnpm ERR!.*?\n","12").value -replace "npm ERR! ").trim() -split "`n"
	return $(Write-Host "[ERR!] " -ForegroundColor Red -NoNewline; Write-Host "npm failed to install the node modules with error code $($err[0] -replace "code ") with the error $($err[1])")
}
else 
{
	Write-Host "[SUCCESS] " -ForegroundColor Green -NoNewline
	Write-Host "node-modules successfully installed!";
}
$pm2exist = (Get-ChildItem "$env:APPDATA\npm").Name -join "" -match "pm2"
if (!$pm2exist)
{ 
	Write-Host "[INFO] " -ForegroundColor Yellow -NoNewline; Write-Host "pm2 not detected, attempting to install pm2..."
	npm i pm2 -g 2>&1
	if ($?) { Write-Host "[SUCCESS] " -ForegroundColor Green -NoNewline; Write-Host "pm2 successfully installed!" }
	else { return $(Write-Host "[ERR!] " -ForegroundColor Red -NoNewline; Write-Host "pm2 not installed successfully") }
}
else 
{
	Write-Host "[INFO] " -ForegroundColor Yellow -NoNewline; Write-Host "pm2 detected on your system"
}
$logs = (Get-ChildItem "./logs" *>&1).Name
$expectedLogs = @("log.log","error.log","lastrun.log")
$neededLogs = Compare-Object -ReferenceObject $expectedLogs -DifferenceObject @($logs|Select-Object)
if ($neededLogs | Where-Object {$_.SideIndicator -eq "=>"})
{
	Write-Host "[INFO] " -ForegroundColor Yellow -NoNewline; Write-Host "redundant log files detected, removing log files..."
	foreach ($_ in $neededLogs | Where-Object {$_.SideIndicator -eq "=>"}) {
		Remove-Item "./logs/$($_.InputObject)" -Force
		if ($?) { Write-Host "[SUCCESS] " -ForegroundColor Green -NoNewline; Write-Host "$($_.InputObject) successfully removed!" }
		else { Write-Host "[ERR!] " -ForegroundColor Red -NoNewline; Write-Host "could not remove $($_.InputObject)" }	
	}
}

if ($neededLogs | Where-Object {$_.SideIndicator -eq "<="})
{
	Write-Host "[INFO] " -ForegroundColor Yellow -NoNewline; Write-Host "needed log files not detected, creating log files..."
	
	foreach ($_ in $neededLogs | Where-Object {$_.SideIndicator -eq "<="} | ForEach-Object InputObject)
	{ 
		New-Item -Path "./logs/$_" -ItemType File 2>&1 > $null 
		if ($?) { Write-Host "[SUCCESS] " -ForegroundColor Green -NoNewline; Write-Host "$_ successfully created!" }
		else { Write-Host "[ERR!] " -ForegroundColor Red -NoNewline; Write-Host "could not create $_" }	
	}
}
Write-Host "[INFO] " -ForegroundColor Yellow -NoNewline; Write-Host "Dumping logs...";
foreach ($t in Get-ChildItem "./logs") {
	try {
		Clear-Content -Path $t.FullName
		Write-Host "[SUCCESS] " -ForegroundColor Green -NoNewline; Write-Host "$($t.Name) has been emptied!";
	}
	catch {
		Write-Host "[ERR!] " -ForegroundColor Red -NoNewline; Write-Host "Could not empty $($t.Name) because: $($_.Exception.Message)"
	}
}
