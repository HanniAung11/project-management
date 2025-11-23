"use client";
import Header from '@/(components)/Header';
import React, { useState, useEffect } from 'react'
import { useGetUsersQuery, useGetTeamsQuery } from '@/state/api';

const Settings = () => {
    const { data: users } = useGetUsersQuery();
    const { data: teams } = useGetTeamsQuery();
    const [userSettings, setUserSettings] = useState({
        username: "John Doe",
        email: "john.doe@example.com",
        teamName: "Development Team",
        roleName: "Developer",
    });

    // Load user data when available
    useEffect(() => {
        if (users && users.length > 0) {
            const currentUser = users[0]; // Using first user as current user
            const userTeam = teams?.find(team => team.teamId === currentUser.teamId);
            setUserSettings({
                username: currentUser.username || "John Doe",
                email: currentUser.email || "john.doe@example.com",
                teamName: userTeam?.teamName || "Development Team",
                roleName: "Developer", // This would come from a role field if available
            });
        }
    }, [users, teams]);

    const handleChange = (field: string, value: string) => {
        setUserSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        // Here you would typically call an API to update user settings
        console.log("Saving settings:", userSettings);
        alert("Settings saved! (This is a demo - implement API call to save)");
    };

    const labelStyles = "block text-sm font-medium text-gray-700 dark:text-white mb-1";
    const inputStyles = "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-dark-tertiary dark:bg-dark-secondary dark:text-white dark:placeholder-gray-400";

    return (
        <div className="p-8">
            <Header name="Settings"/>
            <div className="mt-6 max-w-2xl space-y-6">
                <div>
                    <label htmlFor="username" className={labelStyles}>Username</label>
                    <input
                        id="username"
                        type="text"
                        value={userSettings.username}
                        onChange={(e) => handleChange('username', e.target.value)}
                        className={inputStyles}
                        placeholder="Enter username"
                    />
                </div>
                <div>
                    <label htmlFor="email" className={labelStyles}>Email</label>
                    <input
                        id="email"
                        type="email"
                        value={userSettings.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={inputStyles}
                        placeholder="Enter email"
                    />
                </div>
                <div>
                    <label htmlFor="teamName" className={labelStyles}>Team Name</label>
                    <input
                        id="teamName"
                        type="text"
                        value={userSettings.teamName}
                        onChange={(e) => handleChange('teamName', e.target.value)}
                        className={inputStyles}
                        placeholder="Enter team name"
                    />
                </div>
                <div>
                    <label htmlFor="roleName" className={labelStyles}>Role</label>
                    <input
                        id="roleName"
                        type="text"
                        value={userSettings.roleName}
                        onChange={(e) => handleChange('roleName', e.target.value)}
                        className={inputStyles}
                        placeholder="Enter role"
                    />
                </div>
                <div className="flex justify-end pt-4">
                    <button
                        onClick={handleSave}
                        className="rounded-md bg-pink-400 px-6 py-2 text-white hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 dark:bg-pink-500 dark:hover:bg-pink-600"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Settings;