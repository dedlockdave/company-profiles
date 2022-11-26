supcontainer:
	 npx supabase start

dbtypes:
	 npx supabase gen types typescript --local > types/database.ts