import React from "react";
import { api } from "@/lib/trpc/server";

const DashboardPage = async () => {
	const { greeting } = await api.hello.getGreetings();
	return <div>Dashboard : {greeting}</div>;
};

export default DashboardPage;
