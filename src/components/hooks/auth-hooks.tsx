import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthError, Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export function useGetSession() {
	const [loading, setLoading] = useState(true);
	const supabase = createClientComponentClient();
	const [session, setSession] = useState<
		| {
				data: {
					session: Session;
				};
				error: null;
		  }
		| {
				data: {
					session: null;
				};
				error: AuthError;
		  }
		| {
				data: {
					session: null;
				};
				error: null;
		  }
	>({
		data: {
			session: null,
		},
		error: null,
	});
	useEffect(() => {
		setLoading(true);
		supabase.auth
			.getSession()
			.then((res) => {
				setSession(res);
				setLoading(false);
			})
			.catch(() => {
				setSession({
					data: {
						session: null,
					},
					error: null,
				});
				setLoading(false);
			});
	}, [supabase]);
	return { ...session, loading };
}
