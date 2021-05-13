$PSScriptHome = [System.IO.FileInfo]::new($PSScriptRoot).Directory.FullName
Set-Location $PSScriptHome
npm stop
npm update 2>&1 | Set-Variable err
if ([regex]::Match($err -join "","npm ERR!.*?\nnpm ERR!.*?\n","12").success)
{
	$err = ([regex]::Match($err -join "","npm ERR!.*?\nnpm ERR!.*?\n","12").value -replace "npm ERR! ").trim() -split "`n"
	return $(Write-Host "[ERR!] " -ForegroundColor Red -NoNewline; Write-Host "npm failed to install the node modules with error code $($err[0] -replace "code ") with the error $($err[1])")
}
else 
{
	Write-Host "[SUCCESS] " -ForegroundColor Green -NoNewline
	Write-Host "Local node-modules successfully updated!";
}
npm update -g 2>&1 | Set-Variable err
if ([regex]::Match($err -join "","npm ERR!.*?\nnpm ERR!.*?\n","12").success)
{
	$err = ([regex]::Match($err -join "","npm ERR!.*?\nnpm ERR!.*?\n","12").value -replace "npm ERR! ").trim() -split "`n"
	return $(Write-Host "[ERR!] " -ForegroundColor Red -NoNewline; Write-Host "npm failed to install the node modules with error code $($err[0] -replace "code ") with the error $($err[1])")
}
else 
{
	Write-Host "[SUCCESS] " -ForegroundColor Green -NoNewline
	Write-Host "Global node-modules successfully updated!";
}
while ($true)
{
	npm outdated 2>&1 | Set-Variable out
	if ([String]::IsNullOrEmpty($oo))
	{
		Write-Host "[SUCCESS] " -ForegroundColor Green -NoNewline
		return Write-Host "Everything successfully updated!";
	}
	else {
		$ooga, $booga = $oo;
		$oo = ([Regex]::Matches($booga, "(.*?)\s+", "12")).value;
		$ee = $oo.count;
		$aa = 0;
		for ($i = 0; $i -lt $ee; $i += 4)
		{
			$Feck[$aa] = $oo[$i,3]
			$aa += 1
		}
		foreach ($Bitch in $Feck)
		{
			if ($Bitch[1] -lt $Bitch[2]) 
			{
				npm i $Bitch[0]@$Bitch[2] 2>&1 | Set-Variable err
				if ([regex]::Match($err -join "","npm ERR!.*?\nnpm ERR!.*?\n","12").success)
				{
					$err = ([regex]::Match($err -join "","npm ERR!.*?\nnpm ERR!.*?\n","12").value -replace "npm ERR! ").trim() -split "`n"
					return $(Write-Host "[ERR!] " -ForegroundColor Red -NoNewline; Write-Host "npm failed to install the node modules with error code $($err[0] -replace "code ") with the error $($err[1])")
				}
				else 
				{
					Write-Host "[SUCCESS] " -ForegroundColor Green -NoNewline
					Write-Host "$($Bitch[0]) successfully updated!";
				}
			}
			elseif ($Bitch[1] -ge $Bitch[2]) 
			{
				Write-Host "[SUCCESS] " -ForegroundColor Green -NoNewline
				return Write-Host "Everything successfully updated!";		
			}
		}
	}
}
