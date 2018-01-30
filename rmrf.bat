for %%x in (%*) do (
	
	if %%x=="-r" goto continue
	if %%x=="-f" goto continue
	if %%x=="-rf" goto continue
	
	if exist %%~x\ rd /s /q %%x
	if not exist %%~x\ if exist %%x del /f /q %%x
	
	:continue
	rem
	
)
