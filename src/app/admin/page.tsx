import { Signup, fetchAllSignups, isAdminPasswordSet, isAuthenticated } from "@/lib/league";
import SetupPasswordForm from "./SetupPasswordForm";
import LoginForm from "./LoginForm";
import SignupTable from "./SignupTable";
import { logoutAdmin } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
    const isSet = await isAdminPasswordSet();
    if (!isSet) {
        return <SetupPasswordForm />;
    }

    const auth = await isAuthenticated();
    if (!auth) {
        return <LoginForm />;
    }

    const signups = await fetchAllSignups();

    return (
        <div className="p-8 font-inter max-w-6xl mx-auto">
            <header className="flex justify-between items-start mb-12">
                <div>
                    <p className="font-josefin text-sm tracking-[0.4em] uppercase mb-1">Opera Carmel</p>
                    <h1 className="text-3xl font-normal uppercase tracking-widest">League Admin</h1>
                </div>
                <div className="flex gap-4 items-center">
                    <form action={logoutAdmin}>
                        <button
                            type="submit"
                            className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                        >
                            Sign Out
                        </button>
                    </form>
                    <a
                        href="/api/export-csv"
                        className="bg-black text-white px-6 py-3 uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors"
                    >
                        Export data to .csv
                    </a>
                </div>
            </header>

            <SignupTable initialSignups={signups} />
        </div>
    );
}
