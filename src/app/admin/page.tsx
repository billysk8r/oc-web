import { Signup, fetchAllSignups, isAdminPasswordSet, isAuthenticated } from "@/lib/league";
import SetupPasswordForm from "./SetupPasswordForm";
import LoginForm from "./LoginForm";
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

            <div className="overflow-x-auto border border-[#eaeaea]">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 uppercase text-[10px] tracking-widest text-gray-500 border-b border-[#eaeaea]">
                            <th className="p-4 font-medium">Name</th>
                            <th className="p-4 font-medium">Email</th>
                            <th className="p-4 font-medium">Location</th>
                            <th className="p-4 font-medium">Opt-in</th>
                            <th className="p-4 font-medium">Joined At</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#eaeaea]">
                        {signups.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-400 italic">
                                    No signups found yet.
                                </td>
                            </tr>
                        ) : (
                            signups.map((signup: Signup) => (
                                <tr key={signup.id} className="hover:bg-gray-50 transition-colors text-sm">
                                    <td className="p-4">{signup.name}</td>
                                    <td className="p-4">{signup.email}</td>
                                    <td className="p-4">{signup.location}</td>
                                    <td className="p-4">{signup.opt_in ? "Yes" : "No"}</td>
                                    <td className="p-4 text-gray-500">
                                        {new Date(signup.joined_at).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
