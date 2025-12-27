import { useState } from "react";
import rawData from "./user.json";
import type { User } from "./type";

const TableForm = () => {
    const [users, setUsers] = useState<User[]>(rawData);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const handleChange = (id: number, name: string, value: string) => {
        console.log(id, name, value);

        setUsers((prev: User[]) => prev.map((user: User) => {
            return user.id == id ? { ...user, [name]: value } : user
        }))
    }
    const handleSave = (userId: number) => {
        console.log(users.find(u => u.id == userId))
        setSelectedId(null);
    }
    const handleView = (userId: number) => {
        // navigate(`/user/${userId}`)
        console.log(userId);
    }
    return (
        <div className="w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
            <table className="w-full border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                            Sl No.
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                            Name
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                            Email
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {users.map((user: User, index: number) => (
                        <tr
                            key={index}
                            className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            <td className="px-4 py-2">
                                <input
                                    className="w-12 bg-transparent text-sm text-gray-600 dark:text-gray-300 outline-none text-white"
                                    type="text"
                                    disabled
                                    value={user.id}
                                />
                            </td>

                            <td className="px-4 py-2">
                                <input
                                    className={`w-full rounded-md px-2 py-1 text-sm outline-none transition text-white
                ${user.id === selectedId
                                            ? "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500"
                                            : "bg-transparent text-white"
                                        }`}
                                    type="text"
                                    disabled={user.id != selectedId}
                                    name="name"
                                    value={user.name}
                                    onChange={(e) =>
                                        handleChange(user.id, e.target.name, e.target.value)
                                    }
                                />
                            </td>

                            <td className="px-4 py-2">
                                <input
                                    className={`w-full rounded-md px-2 py-1 text-sm outline-none transition text-white
                ${user.id === selectedId
                                            ? "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500"
                                            : "bg-transparent"
                                        }`}
                                    type="text"
                                    disabled={user.id != selectedId}
                                    name="email"
                                    value={user.email}
                                    onChange={(e) =>
                                        handleChange(user.id, e.target.name, e.target.value)
                                    }
                                />
                            </td>

                            <td className="px-4 py-2 flex gap-3.5 items-center">
                                {user.id == selectedId ? (
                                    <button
                                        onClick={() => handleSave(user.id)}
                                        className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setSelectedId(user.id)}
                                        className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                    >
                                        Edit
                                    </button>
                                )}
                                <button className="bg-green-500 px-2 py-1 rounded-md" onClick={() => handleView(user.id)}>View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default TableForm;
