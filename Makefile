supcontainer:
	 npx supabase start

dbtypes:
	 npx supabase gen types typescript --local > types/database.ts

ts:
	echo ${x}

repl:
    yarn run ts-node -T -O '{"module": "commonjs"}'