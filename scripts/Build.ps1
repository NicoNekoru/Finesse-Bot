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
if(!$pm2exist)
{ 
	Write-Host "[INFO] " -ForegroundColor Yellow -NoNewline; Write-Host "pm2 not detected, attempting to install pm2..."
	npm i pm2 -g 2>&1
	if ($?) { return $(Write-Host "[SUCCESS] " -ForegroundColor Green -NoNewline; Write-Host "pm2 successfully installed!") }
	else { return $(Write-Host "[ERR!] " -ForegroundColor Red -NoNewline; Write-Host "pm2 not installed successfully") }
}
else 
{
	return $(Write-Host "[INFO] " -ForegroundColor Yellow -NoNewline; Write-Host "pm2 detected on your system")
}