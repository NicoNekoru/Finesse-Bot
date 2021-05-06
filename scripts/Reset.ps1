$PSScriptHome = [System.IO.FileInfo]::new($PSScriptRoot).Directory.FullName
Set-Location $PSScriptRoot
.\stahpplease.ps1
Set-Location $PSScriptHome
Write-Host "[INFO] " -ForegroundColor Yellow -NoNewline; Write-Host "Dumping logs...";
try {
	$pass = 'log'
	Clear-Content "$PSScriptHome\logs\$pass.log"
	Write-Host "[SUCCESS] " -ForegroundColor Green -NoNewline; Write-Host "$pass.log has been emptied!";
	$pass = 'error'
	Clear-Content "$PSScriptHome\logs\$pass.log"
	Write-Host "[SUCCESS] " -ForegroundColor Green -NoNewline; Write-Host "$pass.log has been emptied!";
	$pass = 'lastrun'
	Clear-Content "$PSScriptHome\logs\$pass.log"
	Write-Host "[SUCCESS] " -ForegroundColor Green -NoNewline; Write-Host "$pass.log has been emptied!";
} catch {
	Write-Host "[ERR!] " -ForegroundColor Red -NoNewline; Write-Host "Could not empty $pass.log because: $($_.Exception.Message)"
}
if (Test-Path .\node_modules\ -PathType Container)
{
	Write-Host "[INFO] " -ForegroundColor Yellow -NoNewline; Write-Host "Removing node modules...";
	try {
		$pass = "node modules"
		Remove-Item '.\node_modules' -Recurse -Force
		Write-Host "[SUCCESS] " -ForegroundColor Green -NoNewline; Write-Host "Node modules have been deleted!";
		$pass = "package-lock"
		Remove-Item '.\package-lock.json' -Force
		Write-Host "[SUCCESS] " -ForegroundColor Green -NoNewline; Write-Host "Package-lock has been deleted!";
	} catch {
		Write-Host "[ERR!] " -ForegroundColor Red -NoNewline; Write-Host "Could not delete $pass because: $($_.Exception.Message)"
	}
}