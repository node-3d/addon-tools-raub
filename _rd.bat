for %%folder in (%*) do (
	if exist %%folder rd /s /q %%folder
)
