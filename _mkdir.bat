for %%x in (%*) do (
	
	if %%x=="-p" goto continue
	
	if not exist %%x md %%x
	
	:continue
	rem
	
)
