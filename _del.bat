for %%x in (%*) do (
	if exist %%x del /f /q %%x
)
