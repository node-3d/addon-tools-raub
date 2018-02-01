for %%x in (%*) do (
	
	if not %%x=="-p" if not exist %%x md %%x
	
)
