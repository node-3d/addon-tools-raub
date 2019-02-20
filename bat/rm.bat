for %%x in (%*) do (
	
	if not %%x=="-rf" if not %%x=="-r" if not %%x=="-f" if exist %%~x\ rd /s /q %%x
	if not %%x=="-rf" if not %%x=="-r" if not %%x=="-f" if not exist %%~x\ if exist %%x del /f /q %%x
	
)
