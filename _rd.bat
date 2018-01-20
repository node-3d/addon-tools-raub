for %%x in (%*) do (
	if exist %%x rd /s /q %%x
)
